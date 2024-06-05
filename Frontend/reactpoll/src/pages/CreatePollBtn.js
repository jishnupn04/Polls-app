import React from 'react'
import './styles/CreatePollBtn.css'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function CreatePollBtn() {
  const navigate = useNavigate()

  const gotToNewPage=()=>{
    navigate("/createpoll");
  }
  return (
    <div class="b1">
        <Button variant="contained" id="b1" className='btn' onClick={()=>gotToNewPage()} size="small">Create Poll</Button>
    </div>
  )
}

export default CreatePollBtn