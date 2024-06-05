import React from "react";
import Heading from "./Heading.js";
import VoteQn from "./VoteQn.js";
import Option from "./Option.js";
import { useLocation } from "react-router-dom";
import "./styles/vote.css"
function Vote() {
  const location = useLocation();
  const { fromPolls } = location.state;
  let polls = fromPolls.polls;
  console.log(polls)
  return (
    <div>
      <Heading />
      <div class="container2">
        <VoteQn polls={polls}/>
        <Option polls={polls}/>
      </div>
    </div>
  );
}

export default Vote;
