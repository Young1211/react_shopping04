
//product model 스키마 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    writer : { //작성자 
        type : Schema.Types.ObjectId,
        ref : 'User'  
    },
    title : { //이름 
        type : String,
        maxlength : 50
    },
    description : { //설명
        type : String,
    },
    price : { //가격 
        type : Number,
        default : 0
    },
    images : { //이미지
        type : Array,
        default : []
    },
    sold : { //몇 개가 팔렸는지 
        type : Number,
        maxlength: 100,
        default : 0
    },
    continents : {
        type : Number,
        default: 1,
    },
    views : { //사람들이 얼마나 봤는지
        type : Number,
        default : 0,
    },

},{timestamps:true})

productSchema.index({ //만약 검색할 때 설명, 제목 부분이 걸리게끔 하고싶다면 
    title: 'text',
    description : 'text'

},{
    weights : {  //타이틀을 중요하게 본다!
        title:5, //중요한 필드명 적기. 검색에 걸릴 확률 up
        description : 1
    }
})



const Product = mongoose.model('Product', productSchema);
//model User를 Product으로 바꿔주야 함! 에안 그러면 db 에러!


module.exports = { Product }



/*
-product 모델(model) 만들기.
mongoose.model('Product', productSchema)
첫 번째 파라미터는 스키마 이름이고, 두 번째 파라미터는 스키마 객체 
몽고db는 스키마 이름을 정하면 그 이름의 복수 형태로 
데이터 베이스에 컬렉션 이름을 만듦 

Product -> Products(몽고 아틀라스에 생성된 컬렉션 이름)

*/