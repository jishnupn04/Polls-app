import React from 'react'
import './styles/MainContent.css'
import PollsTable from './PollsTable'
import { useNavigate } from "react-router-dom";


function MainContent() {
  return (
    <div>
      <PollsTable/>
    </div>
  )
}

export default MainContent