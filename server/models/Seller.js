//seller 스키마 


const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sellerSchema = mongoose.Schema({
    //판매자 아이디
   
    title  : { //제목
        type : String,
        maxlength : 50
    },

    profile : { //프로필(상세 설명)
        type : String,
    },

    images : { //이미지
        type : Array,
        default :[]
    },

})

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = {Seller}