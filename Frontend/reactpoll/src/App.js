import "./pages/styles/App.css";
import Home from "./pages/Home.js";
import Vote from "./pages/Vote.js";
import PollDetail from "./pages/PollDetail.js";
import CreatePoll from "./pages/CreatePoll.js";
function App() {
  return (
    <div className="App">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <Home />
      <PollDetail />
      <Vote />
      <CreatePoll />
    </div>
  );
}

export default App;
