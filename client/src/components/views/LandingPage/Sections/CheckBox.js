import React, { useState } from "react";
import  {Collapse, Checkbox} from 'antd';

const {Panel} = Collapse;

function CheckBox(props) {

    const [Checked,setChecked] = useState([])

    const handleToggle = (value) =>{
        //누른 것의 index를 구하고
        const currentIndex = Checked.indexOf(value);

        //전체 Checked된 State에서 현재 누른 Checkbox가 이미 있다면
        //빼주고 State 넣어준다

        const newChecked = [...Checked]
        if(currentIndex === -1){
            newChecked.push(value)
            //빼주고 
        }else{
            newChecked.splice(currentIndex,1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

  const renderCheckboxList = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox onChange={()=>handleToggle(value.id)}
            checked={Checked.indexOf(value._id)===-1 ? false : true} />
        <span>{value.name}</span>
      </React.Fragment>
    ));
    //false면 전체 선택 해제, true면 전체 선택!

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="This is panel header 1" key="1">
          {renderCheckboxList()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;