import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Heading.css"

function Heading() {
  const navigate = useNavigate();

  const gotToNewPage = () => {
    navigate("/");
  };
  return (
    <div>
      <div class="heading">
        <h1  onClick={() => gotToNewPage()}>
          FlyWeight Polls{" "}
        </h1>
      </div>
    </div>
  );
}

export default Heading;
