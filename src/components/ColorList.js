import React, { useState,useEffect } from "react";
import {useParams, useHistory} from 'react-router-dom'
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const {id} = useParams();
  const { push } = useHistory();

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/colors/${id}`)
    .then(res =>{
      editColor(res.data)
    })
    .catch(err => console.log(err))
  },[id])

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };



  const saveEdit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/colors/${id}`,colorToEdit)
    .then(res =>{
      console.log(res.data);
      updateColors(res.data);
      push(`/colors/${id}`)

    })
    .catch(err =>console.log(err))
  };

  const deleteColor = color => {
    axios.delete(`http://localhost:5000/api/colors/${id}`,color)
    .then(res =>{
      console.log(res);      
      push(`/colors`)

    })
    .catch(err =>console.log(err))


  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.