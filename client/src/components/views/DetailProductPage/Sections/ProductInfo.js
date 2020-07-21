import React from 'react';
import { Descriptions, Button } from 'antd';
function ProductInfo(props) {
    return (
      <div>
        <Descriptions title="상품 정보" bordered>
    <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
    <Descriptions.Item label="판매">{props.detail.sold}</Descriptions.Item>
    <Descriptions.Item label="조회수">{props.detail.views}</Descriptions.Item>
    <Descriptions.Item label="상품 설명">{props.detail.description}</Descriptions.Item>
        </Descriptions>
      </div>
    );
}

export default ProductInfo;