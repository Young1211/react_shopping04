//여러 군데에서 쓰이는 파일들을 utils 폴더에 넣어놓는다!
//프론트엔드 파일 처리 
// @flow


import React from "react";
import Dropzone from "react-dropzone";
import {Icon} from 'antd';
import axios from 'axios'
import { response } from "express";
function FileUpload(props) {

  const dropHandler = (files) =>{
    
    let formData = new FormData();
    const config = {
      header : {'content-type' : 'multipart/form-data'}
    }
    formData.append("file", files[0])

    axios.post('/api/product/image', formData,config)
      .then(response=>{
        if(response.data.success){

        }else{
          alert('파일을 저장하는데 실패했습니다.')
        }
      })

  }




  return (
    <div>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style= {{width:300, height: 240, border: '1px solid lightgray',
              display: 'flex', alignItems: 'center', justifyContent: 'center '
            }}
            {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type = "plus" style = {{fontSize:'3rem'}}/>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;




//프런트엔드에서 엑시오스로 파일 전달
