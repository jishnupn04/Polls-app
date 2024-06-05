import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PollDetail from "./pages/PollDetail";
import Vote from "./pages/Vote";
import CreatePoll from "./pages/CreatePoll";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/polldetail/" element={<PollDetail />} />
          <Route path="vote/" element={<Vote />} />
          <Route path="createpoll/" element={<CreatePoll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
