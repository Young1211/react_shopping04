const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Seller} = require('../models/Seller');

//백엔드 -> 프론트 엔드로 파일 저장, 정보 전달
//Seller

var storage = multer.diskStorage({
    destination: function (req, file, cb) { //어디에 파일이 저장되는지.
      cb(null, 'profiles/') //모든 파일이 들어가게 됨
    },
    //파일명
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")

  router.post('/image', (req, res) => {
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



  router.post('/', (req, res) => {
    //받아온 정보들을 DB에 넣어 준다.

    const seller = new Seller(req.body)
    seller.save((err)=>{
      if(err) return res.status(400).json({success: false, err});
      return res.status(200).json({success: true});
    });

  });




  module.exports = router;
  //router를 통해 index.js에서 사용 가능


//받아온 이미지 정보 db에 저장하기
