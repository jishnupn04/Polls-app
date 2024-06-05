import React, { useEffect, useState, useContext } from "react";
import "./styles/PollsTable.css";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "./HomeContext.js";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";

const PollsTable = () => {
  const { selectedTags, setSelectedTags } = useContext(HomeContext);
  console.log(selectedTags);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [polls, setPolls] = useState([]);
  var tagsList = [];
  useEffect(() => {
    if (selectedTags.length > 0) {
      fetch(
        `http://127.0.0.1:8000/polls/filter_view/?tags=[${JSON.stringify(
          selectedTags
        )}]`
      )
        .then((response) => response.json())
        .then(({ data }) => {
          console.log(data);
          setPolls(data);
        })
        .catch((error) => {
          console.error("Page not fetched", error);
        });
    }
    else{
      fetch("http://127.0.0.1:8000/polls/")
      .then((response) => response.json())
      .then((data) => {
        const questions = data.data.map((item) => ({
          id: item.QuestionID,
          Question: item.Question,
          Tags: item.Tags,
          OptionVote: item.OptionVote,
        }));
        setPolls(data.data);
      })
      .catch((error) => {
        console.error("Page not fetched", error);
      });
    }
  }, [selectedTags]);
  console.log(polls);

  const navigate = useNavigate();

  const gotToNewPage = (QuestionID) => {
    navigate(`/polldetail?id=${QuestionID}`);
  };
  const columns = [
    {
      field: "QuestionID",
      headerName: "ID",
      flex: isMobile ? 0.5 : 1,
      minWidth: isMobile ? 75 : 100,
    },
    {
      field: "Question",
      headerName: "Poll Question",
      flex: isMobile ? 2 : 4,
      minWidth: isMobile ? 150 : 350,
      renderCell: (params) => (
        <button
          onClick={() => navigate(`/polldetail?id=${params.row.QuestionID}`)}
        >
          {params.value}
        </button>
      ),
    },
    {
      field: "TotalVotes",
      headerName: "Total Votes",
      flex: isMobile ? 0.5 : 1,
      minWidth: isMobile ? 75 : 150,
    },
    {
      field: "Tags",
      headerName: "Tags",
      flex: isMobile ? 0.5 : 1,
      minWidth: isMobile ? 75 : 150,
      sortable: false,
    },
  ];
  const rows = polls.map((poll, id) => ({
    id,
    QuestionID: poll.QuestionID,
    Question: poll.Question,
    TotalVotes: poll.TotalVotes,
    Tags: poll.Tags.join(", "),
  }));
  return (
    <div class="pollstable">
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            lineHeight: '1.5',
            padding: '5px',
            textAlign:'left'
          },
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </div>
  );
};
export default PollsTable;
