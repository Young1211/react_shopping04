import React,{useState} from 'react';
import {Typography, Button, Form, Input} from 'antd'; //antd에서 필요한 컴포넌트를 가져온다 
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

//import 'antd/dist/antd.css';

const {TextArea} = Input;
//TextArea! Textarea가 아님!


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

//업로드 페이지에서 백엔드로 넘겨줘야 하는데 이미지 정보가 없음

  const[Title, setTitle] = useState("")
  const[Descripton, setDesription] = useState("")
  const[Price, setPrice] = useState(0)
  const [Continent, setContinent] = useState(1)
  
  const[Images, setImages] = useState([]) //상품 사진!


 //vaule의 첫 글자를 대문자로 쓰면 입력이 안됨!

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
  const updateImages = (newImages) =>{
    setImages(newImages)
  }
  const submitHandler = (event) =>{
    event.preventDefault(); //자동적으로 페이지가 refresh 되는 것을 막음
  
  
  if(!Title || !Descripton || !Price || !Continent || !Images){
    return alert("모든 값을 넣어주셔야 합니다.")
  }
  
//간단한 유효성 체크
//모든 칸이 채워지지 않으면 확인을 할 수 없다!


  //서버에 채운 값을 request로 보낸다.
    const body = { 
      //로그인 된 사람의 ID
      writer: props.user.userData._id,
      title : Title,
      description : Descripton,
      price:Price,
      images: Images,
      continents : Continent,
    }

//모든 정보들을 백엔드로 보냄!
 
    Axios.post("/api/product", body)
      .then(response=>{
        if(response.data.success){
          alert("상품 업로드에 성공했습니다.")
          props.history.push('/')
        }else{
          alert("상품 업로드에 실패했습니다.")
        }
      })
  
    }



  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>상품 업로드</h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        {/* FileUpload 컴포넌트에 전달 */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Descripton} />
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
        <Button 
          onClick={submitHandler}>
          확인
        </Button>
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

onChange 이벤트 핸들링 
const handler =  (e) =>{
  setHandler(e.current.value)
}

ㅁHook
함수 컴포넌트에서 생명주기 기능(라이프 사이클)과
리액트 state를 연동할 수 있게 해주는 함수
-useState, useEffect

*ant design으로 코드를 작성하면
  <Button 
          onClick={submitHandler}>
          확인
        </Button>
 onClick = {submitHandler}
 핸들러 함수를 꼭 넣어줘야함!

 *그냥 button 태그에서는
 <button type="submit"></button> 해도 됨
 




*/