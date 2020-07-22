import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from"axios";
import {Icon, Col, Card, Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import Checkbox from './Sections/CheckBox';
import SearchFeature from './Sections/SearchFeature';
import  {continents, price} from './Sections/Datas'

//데이터 가져오기

function LandingPage() {
  


    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) //0부터 시작 
    const [Limit, setLimit] = useState(8) //8개 가져옴
    const [PostSize,setPostSize] = useState(0)  //더 볼 데이터가 있을 때만 더보기 버튼을 활성화
    const [Filters, setFilters] = useState({
        continents: [],
        price: [],
    })
    const [SearchTerm, setSearchTerm] = useState("")

    //useEffect-훅의 일종
    //컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정

    useEffect(()=>{
        //componentDidMount 영역

        let body = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(body)

    },[])

//skip만 달리해서 보내면 더보기!

const getProducts = (body) => {
  axios.post("/api/product/products",body)
  .then((response) => {
    if (response.data.success) {
        if (body.loadMore){ //더보기 버튼을 눌렀을 때 
            setProducts([...Products, ...response.data.productInfo])
        } else{
            setProducts(response.data.productInfo);
        }
        setPostSize(response.data.PostSize)
    } else {
      alert("상품들을 가져오는데 실패했습니다.");
    }
  });
};


 const loadMoreHandler = () => {

    let skip = Skip + Limit //0+8, 8+8(limit을 더해준 값)
       //       0   +   8
       //       8   +   8

    let body = {
        skip : Skip,
        limit: Limit, 
        loadMore: true,  //더 보기를 눌렀을 때 가는 req
    }
     getProducts(body)
     setSkip(skip)

 };

    const renderCards = Products.map((product, index) => {
      console.log("product", product);
      return <Col lg={6} md={8} xs={24} key={index}> 
          <Card
            cover={<a href={`/product/${product._id}`}><img style={{width:'100%',maxHeight:'150px'}} src={`http://localhost:5000/${product.images[0]}`} /></a>}
          >
            <Meta title={product.title} description={`$${product.price}`} />
          </Card>
        </Col>
    });

 //key 에러 -> key= {index}
 //product._id - 아이디 고유 정보
 

   const showFiterResults = (filters) =>{

      let body = {
        skip : 0,
        limit : Limit,
        filters : filters

      }
      getProducts(body)
      setSkip(0)

   }


    const handleFilters = (filters, category) =>{
        const newFilters = {...Filters} //새로운 객체 생성

        newFilters[category] = filters
        
        showFiterResults(newFilters)
        
    }

    const updateSearchTerm = (newSearchTerm)=>{

   
      let body = {
        skip : 0,
        limit : Limit,
        filters : Filters,
        searchTerm: newSearchTerm
      }
      setSkip(0)
      setSearchTerm(newSearchTerm)
      getProducts(body)

    }


    return (
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Let's Travel Anywhere <Icon type="rocket" />{" "}
          </h2>
        </div>

        {/* 필터 */}

        {/* 체크박스 */}
            <Checkbox list = {continents} handleFilters={filters =>handleFilters(filters,"continents")}/>

        {/* 라디오박스 */}


        {/* 서치. div style을 먹여서 오른쪽 상단에 위치시킨다!*/}
        <div style={{display:'flex',justifyContent:'flex-end', margin: '1rem auto'}}>
             <SearchFeature
                refreshFunction={updateSearchTerm}
             />
        </div>
     

        {/* 카드 */}

        {/* 여백 주기 */}
        <Row gutter={[16, 16]}>{renderCards}</Row>

        <br />
          <div style={{ display : 'flex' , justifyContent: "center" }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
     
        {/* renderCards를 생성하고 사용해야 이미지가 나온다! */}
      </div>
    );
}

export default LandingPage

/*
데이터베이스에 저장한 상품 데이터들을 랜딩 페이지에 가져옴



*반응형
Col lg={6} md={8} xs={24} key={index}
가장 커질 때 6(6x4=24)
중간 8(8x3=24)
가장 작을 때 24(24)

     {PostSize >= Limit && (
          <div style={{ display : 'flex' , justifyContent: "center" }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}



  -더보기 이미지
   8개가 기본적으로 나온 다음에 하나가 추가가 되어야 하는데
   기존 8개가 같이 딸려나옴 
   8+1가 아니라 8+8+1가 되는 문제 발생!


*/