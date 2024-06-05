import React from "react";
import "./styles/VotePoll.css";
import { useNavigate , Link } from "react-router-dom";
import Button from '@mui/material/Button';
function VotePoll({polls}) {
  const navigate = useNavigate();
  const gotToNewPage = (QuestionID) => {
    navigate(`vote?id=${QuestionID}`);
  };

  console.log(polls)
  return (
    <div class="votepoll">
      <h2>{polls.Question}</h2>
      <Link to={`/vote?id=${polls.QuestionID}`} state={{ fromPolls: { polls } }}><Button variant="contained" size="small">Vote on this poll</Button></Link>
    </div>
  );
}

export default VotePoll;
