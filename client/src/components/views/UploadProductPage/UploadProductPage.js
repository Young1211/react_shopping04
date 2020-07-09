import React,{useState} from 'react';
import {Typography, Button, Form, Input} from 'antd'; //antd에서 필요한 컴포넌트를 가져온다 
import FileUpload from '../../utils/FileUpload'
//import 'antd/dist/antd.css';


const {Title} = Typography;
const {Textarea} = Input;

const Continents = [ //옵션 안의 내용!
  {key:1, value: "Africa"},
  {key:2, value: "Europe"},
  {key:3, value: "Asia"},
  {key:4, value: "North America"},
  {key:5, value: "south America"},
  {key:6, value: "Australia"},
  {key:7, value: "Antarctica"},
]


//자식 컴포넌트
function UploadProductPage(props) {


  const[Title, setTitle] = useState("")
  const[Descripton, setDesription] = useState("")
  const[Price, setPrice] = useState(0)
  const [Continent, setContinent] = useState(1)
  const[Images, setImages] = useState([]) //상품 사진!


 //vaule의 첫 글자를 대문자로 쓰면 입력이 아됨!
  const titleChangeHandler = (event) =>{
    setTitle(event.currentTarget.value) 
  }
  const descriptionChangeHandler = (event) =>{
    setDesription(event.currentTarget.value)
  }
  const priceChangeHandler = (event) =>{
    setPrice(event.currentTarget.value)
  }
  const continentChangeHandler = (event) =>{
    setContinent(event.currentTarget.value)
  }
  const updateImagesChangeHandler = (newImages) =>{
    setImages(newImages)
  }
  const submitHandler = (event) =>{
    event.preventDefault(); //자동적으로 페이지가 refresh 되는 것을 막음
  }
  




  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>상품 업로드</h2>
      </div>

      <Form>

          {/* DropZone */}
            <FileUpload/>
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <textarea onChange={descriptionChangeHandler} value={Descripton} />
        <br />
        <br />
        <label>가격</label>
        <Input onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button>확인</Button>

        {/* <Button>전송</Button> */}
      </Form>
    </div>
  );
}

export default UploadProductPage;


//antd 디자인 import시 에러 발생!
//item.key로 key값을 읽어옴
//화면에 나라 이름을 보여주기 위해서는 itme.value으로 value 값을 얻어옴!


/*
select의 onChange -> 옵션들이 변화될 때 value이 바뀔 수 있게!
input의 onChange -> 키보드에서 입력한 값으로 바뀜 

*/