const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product') //model에서 export 해온 것을 가져옴

//백엔드 ->프론트 엔드로 파일 저장, 정보 전달

//=================================
//             Product
//=================================

//multer num 검색

var storage = multer.diskStorage({
    destination: function (req, file, cb) { //어디에 파일이 저장되는지.
      cb(null, 'uploads/')
    },
    //파일명
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")

  router.post("/image", (req, res) => {
    //가져온 이미지를 저장해주면 된다
    upload(req, res, (err) => {
      if (err) {
        //에러 발생시 에러를 json형태로 웹 브라우저에 표시
        return req.json({ success: false, err });
      }
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  });

  router.post("/", (req, res) => {
    //받아온 정보들을 DB에 넣어준다.product model 가져와야 함

    const product = new Product(req.body); //객체 생성
    product.save((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });

   //렌딩을 products로 했으니까 products로 넣어주기

  router.post("/products", (req, res) => {
    //product collection에 들어 있는 모든 상품 정보 가져오기

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm

    let findArgs = {};
    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        findArgs[key] = req.body.filters[key];
      }
    }

    console.log("findArgs", findArgs);

    if (term) {
      //Product 컬렉션에서 일치하는 자료를 갖고온다.
      Product.find(findArgs) //모델.find()
      .find({"title":{'$regex': term}})
      .populate("writer") //wirter에 대한 모든 정보를 가져옴
      .skip(skip) //검색된 결과 무시 
      .limit(limit) //검색된 결과 보여줌
      .exec((err,productInfo) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({
          success: true, productInfo,
          postSize: productInfo.length
        })
      })

    } else {
      Product.find(findArgs) //모델.find()
        .populate("writer") //wirter에 대한 모든 정보를 가져옴
        .skip(skip) //검색된 결과 무시
        .limit(limit) //검색된 결과 보여줌
        .exec((err, productInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({
            success: true,
            productInfo,
            postSize: productInfo.length,
          });
        });
    }


    
  });


  router.get("/products_by_id", (req, res) => {

    let type = req.query.type 
    let productId = req.query.id
    //productID를 이용해서 DB에서 productID와 같은 상품의 정보를 가져온다.

    Product.find({_id: productId})
      .populate('writer')
      .exec((err, product)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).send({success:true,product})
      })

  });


module.exports = router;



//프런트(FileUpload)에서 보내는 요청을 이쪽에서 받는다

//find 함수 조건이 없을 때는 find()로 작성

//삼항 연산자
// (조건식) ? A : B

/*
1. {$text:{$search: term
-문자열 내용의 텍스트 검색을 수행하는 쿼리 
-텍스트 검색을 수행하기 위해 몽고디비는 텍스트 인덱스와
$text 연산자를 사용함

2. .find({$text:{$search: term}})
-검색어와 완전히 일치해야만 데이터가 나옴 
노을 -> 노을1(검색어와 일치하지 않아서 나오지 않음)

3.find({"title":{'$regex': term}})
검색어와 일부 일치하는 데이터를 보여줌
노을 -> 노을1, 노을2, 노을땡땡...




*/