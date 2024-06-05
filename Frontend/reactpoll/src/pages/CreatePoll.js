import React from "react";
import PollForm from "./PollForm";
import Heading from "./Heading";

function CreatePoll() {
  return (
    <div>
      <Heading />
      <div class="container">
        <PollForm />
      </div>
    </div>
  );
}

export default CreatePoll;
