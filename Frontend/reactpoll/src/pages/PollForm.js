import React, { useState, useEffect } from "react";
import "./styles/PollForm.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function PollForm() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [tags, setTags] = useState("");
  const [canCreatePoll, setCanCreatePoll] = useState(options.length >= 2);

  useEffect(() => {
    setCanCreatePoll(options.length >= 2);
  }, [options]);

  const handleQuestionChange = (event) => {
    setQuestions(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...options];
      newArray.splice(index, 1);
      setOptions(newArray);
  };

  const goToNewPage = () => {
    console.log(questions)
    if (questions === "") {
      alert("Please provide a poll question");
      return;
    } 
    else {
      async function createPoll() {
        const optionVote = {};
        options.forEach((option) => {
          if (option) optionVote[option] = 0;
        });

        const data = {
          Question: questions,
          OptionVote: optionVote,
          Tags: tags.split(","),
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };

        try {
          const response = await fetch(
            `http://127.0.0.1:8000/polls/post_view/`,
            requestOptions
          );
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
      createPoll();

      if (options.length >= 2) {
        navigate("/");
      } else {
        alert("Not enough Options");
      }
    }
  };

  return (
    <div>
      <div className="form">
        <div>
          <div className="question">
            <h2>Question</h2>
            <label htmlFor="Question"></label>
            <input
              id="Question"
              type="text"
              value={questions}
              onChange={handleQuestionChange}
              placeholder="Type your poll questions here"
              required
            />
          </div>
          <div className="ans">
            <h2>Answer Options</h2>
            {options.map((option, index) => (
              <div key={index} className="options">
                <label htmlFor={`op${index}`}></label>
                <input
                  id={`op${index}`}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e)}
                  placeholder={`Option ${index + 1}`}
                />
                {options.length>2?
                  <IconButton
                  aria-label="delete"
                  className="delete"
                  onClick={() => handleDeleteInput(index)}
                  >
                    <DeleteIcon />
                  </IconButton>:
                  <></>
                } 
                
                <br />
                <br />
              </div>
            ))}
            <Button
              className="add"
              onClick={addOption}
              variant="outlined"
              size="small"
            >
              Add Option
            </Button>
          </div>
        </div>
        <div className="tags">
          <h2>Comma Separated Tags</h2>
          <label htmlFor="tag"></label>
          <input
            id="tag"
            type="text"
            value={tags}
            onChange={handleTagsChange}
            placeholder="Tag1,Tag2,Tag3"
          />
        </div>
      </div>
      <div className="PollBtn">
        {canCreatePoll && (
          <Button onClick={goToNewPage} variant="contained" size="small">
            Create Poll
          </Button>
        )}
      </div>
    </div>
  );
}

export default PollForm;
