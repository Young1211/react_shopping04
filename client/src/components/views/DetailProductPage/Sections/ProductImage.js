import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
//props를 이용해서 product의 모든 정보를 가져옴\

    const [Images, setImages] = useState([])

    useEffect(()=>{
        if(props.detail.images && props.detail.images.length >0){
            let images = [] //array

             props.detail.images.map(item =>{
                 images.push({
                     original:`http://localhost:5000/${item}`,
                     thumbnail: `http://localhost:5000/${item}`

                 })
             })
             setImages(images)
        }
        
    },[props.detail])



    return (
        <div>
            <ImageGallery items={Images}/>
        </div>
    );
}

export default ProductImage;