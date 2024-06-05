import React, { useEffect, useState } from "react";
import './styles/Tags.css'
function Tags({polls}) {
  const [Tag, SetTag] = useState([]);
  useEffect(() => {
    if (polls.Tags) {
      SetTag(polls.Tags);
    }
  }, [polls]);
  console.log(Tag)
  return (
    <div>
        <p>Tags: {Tag.join(' , ')}</p>
    </div>
  )
  
}

export default Tags