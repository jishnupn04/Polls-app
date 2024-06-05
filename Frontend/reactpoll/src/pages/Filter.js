import React, { useState, useEffect, useContext } from "react";
import "./styles/Filter.css";
import { useSearchParams } from "react-router-dom";
import { HomeContext } from "./HomeContext.js";
import Button from '@mui/material/Button';
const PollsApp = () => {
  const [tags, setTags] = useState([]);
  const [tempTags, setTempTags] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/polls/tags_view")
      .then((response) => response.json())
      .then((data) => setTags(data.data));
  }, []);
  console.log(tags);
  const { selectedTags, setSelectedTags } = useContext(HomeContext);
  const handleSelectedTags = (event) => {
    let newArray = [...tempTags];
    if (newArray.includes(event.target.value)) {
      newArray = newArray.filter((tags) => tags !== event.target.value);
    } else {
      newArray.push(event.target.value);
    }
    setTempTags(newArray);
  };
  const FilterByTags = () => {
    setSelectedTags(tempTags);
  };
  return (
    <div>
      <div id="check">
        {tags.map((tag, id) => (
          <div key={id}>
            <label for={tag}>
              <input
                id={tag}
                type="checkbox"
                value={tag}
                onChange={handleSelectedTags}
              />
              {tag}
            </label>
          </div>
        ))}
        <Button id="btwo" onClick={() => FilterByTags()} variant="outlined" size="small" color="secondary">Filter By Tags</Button>
      </div>
    </div>
  );
};

export default PollsApp;
