import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./styles/MainComp.css";
import { DataGrid } from "@mui/x-data-grid";

function MainComp({ polls }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "option", headerName: "Option", width: 130 },
    { field: "votes", headerName: "Votes", width: 130 },
  ];
  console.log(polls.OptionVote);
  const [OptionVotes, SetOptionVotes] = useState({});
  useEffect(() => {
    if (polls.OptionVote) {
      SetOptionVotes(polls.OptionVote);
    }
  }, [polls]);
  console.log(OptionVotes);
  for (const property in OptionVotes) {
    console.log(`${property}: ${OptionVotes[property]}`);
  }
  const rows = Object.keys(OptionVotes).map((key, index) => ({
    id: index + 1,
    option: key,
    votes: OptionVotes[key],
  }));
  return (
    <div class="maincomp">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {/* <table id="t1">
        <thead>
          <tr>
            <th>Number</th>
            <th>Option</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(OptionVotes).map((key, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{key}</td>
              <td>{OptionVotes[key]}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default MainComp;
