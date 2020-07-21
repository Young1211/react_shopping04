import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {Row, Col} from 'antd';



function DetailProductPage(props) {

    const productId = props.match.params.productId
    const [Product, setProduct] = useState({})

    useEffect(()=>{ //값을 받아옴 
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response =>{
            if(response.data.success){
                console.log('respons.data',response.data);
                setProduct(response.data.product[0])
            }else{
                alert("상세 정보 가져오기를 실피했습니다.")
            }
        })
    },[])

    return (
      <div style={{ width: "100%", padding: "3rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{Product.title}</h1>
        </div>

        <br />
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24}>
            {/* productImage */}
            <ProductImage detail={Product} />
          </Col>
          <Col lg={12} sm={24}>
            {/* productInfo */}
            <ProductInfo detail={Product} />
          </Col>
        </Row>
      </div>
    );
}

export default DetailProductPage;

//lg,sm은 반응형!
//모든 정보를 props로 내려줌


