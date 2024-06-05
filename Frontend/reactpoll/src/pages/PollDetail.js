import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import VotePoll from "./VotePoll";
import MainComp from "./MainComp";
import Tags from "./Tags";
import PieChart from "./PieChart";
import "./styles/PollDetail.css";
import { useSearchParams } from "react-router-dom";

function PollDetail() {
  const [polls, setPolls] = useState({});
  const [searchParam, setSearchParam] = useSearchParams();
  const poll_id = searchParam.get("id");

  useEffect(() => {
    if (polls) {
      fetch(`http://127.0.0.1:8000/polls/${poll_id}/`)
        .then((response) => response.json())
        .then((data) => {
          setPolls(data.data);
        })
        .catch((error) => {
          console.error("Page not fetched", error);
        });
    }
  }, [polls]);
  return (
    <div>
      <Heading />
      <div class="container">
        <div class="detail">
          <VotePoll polls={polls} />
          <MainComp polls={polls} />
        </div>
        <PieChart class="piechart" polls={polls} />
        
      </div>
      <div className="tags">
          <Tags polls={polls} />
        </div>
    </div>
  );
}

export default PollDetail;
