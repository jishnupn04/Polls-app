import React from "react";
import "./styles/PollBtn.css";
import { useNavigate } from "react-router-dom";

function PollBtn() {
  const navigate = useNavigate();
  const gotToNewPage = () => {
    navigate("/");
  };
  return (
    <div class="PollBtn">
      <button onClick={()=>gotToNewPage()}>Create Poll</button>
    </div>
  );
}

export default PollBtn;
