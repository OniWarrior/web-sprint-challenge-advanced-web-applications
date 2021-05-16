import axios from "axios";
import React, { useEffect, useState } from "react";
import {axiosWithAuth} from '../helpers/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(()=>{
    axiosWithAuth().get('http://localhost:5000/api/colors')
    .then(res=>{
      setColorList(res.data)
    })
    .catch(err =>console.log(err))
  },[colorList])

  return (
    <div className="container">
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles data-testid='bubbles' colors={colorList} />
    </div>
  );
};

export default BubblePage;


