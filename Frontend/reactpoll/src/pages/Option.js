import React, { useEffect, useState } from "react";
import "./styles/Option.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Option({ polls }) {
  const navigate = useNavigate();
  const gotToNewPage = () => {
    console.log(
      `Question ID: ${polls.QuestionID}, Selected Option: ${selectedOption}`
    );
    if(selectedOption==""){
      alert("Please select an option");
      return;
    }
    async function updatePost() {
      // Define the data to update
      const data = {
        incrementOption: `${selectedOption}`,
      };

      // Define the request options
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/polls/${polls.QuestionID}/`,
          requestOptions
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    updatePost();
    navigate("/");
  };
  console.log(polls.OptionVote);
  const [selectedOption, setSelectedOption] = useState("");
  const [OptionVotes, SetOptionVotes] = useState({});
  useEffect(() => {
    if (polls.OptionVote) {
      SetOptionVotes(polls.OptionVote);
    }
  }, [polls]);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  console.log(OptionVotes);
  return (
    <div className="cont">
      {Object.keys(OptionVotes).map((key, id) => (
        <div className="options" key={id}>
          <input
            type="radio"
            id={`option-${id}`}
            name="wc"
            value={key}
            onChange={handleOptionChange}
          />
          <label htmlFor={`option-${id}`}>{key}</label>
          <br />
        </div>
        
      ))}
      <div className="vote">
        <Button
          variant="contained"
          size="small"
          color="primary"
          className="votebtn"
          onClick={() => gotToNewPage()}
        >
          Vote
        </Button>
      </div>
    </div>
  );
}

export default Option;
