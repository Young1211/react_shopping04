//여러 군데에서 쓰이는 파일들을 utils 폴더에 넣어놓는다!
//프론트엔드 파일 처리/
//파일 업로드만을 위한 컴포넌트 


//이미지 정보가 fileUpload 파일에 있다!


import React, {useState} from "react";
import Dropzone from "react-dropzone";
import {Icon} from 'antd';
import axios from 'axios'



function FileUpload(props) {
  const [Images, setImages] = useState([]); //usestate으로 내용 저장
  //배열안에 string이 들어갈 수 있게
  //Images의 실질적 정보가 들어간 컴포넌트
  //부모 컴포넌트(UploadPage)에 올려줘야 함

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setImages([...Images, response.data.filePath]);
        props.refreshFunction([...Images,response.data.filePath])
       
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };

  const deleteHandler = (image)=>{ //이미지 삭제
    const currentIndex = Images.indexOf(image)
    let newImages = [...Images]
    newImages.splice(currentIndex,1)
    setImages(newImages)
    props.refreshFunction(newImages)

    
    //모든 새로운 이미지를 복사함
    
  }
  return (
    <div>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center ",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {/* 만약 안 올리고 싶은 이미지를 올렸을 때-> 이미지 삭제  */}
        {Images.map((image, index) => (
          <div onClick={()=>deleteHandler(image)}key={index}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;




//프런트엔드에서 엑시오스로 파일 전달
//map 함수에 key값을 넣지 않으면 warning 발생
//indexOf(특정 문자, 시작열)
// -지정된 문자열에서 특정한  문자(열)의 첫번째 위치 알려줌


//정보 서버-> 데이터베이스
