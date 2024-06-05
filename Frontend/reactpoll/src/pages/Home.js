import "./styles/Home.css";
import React, { useState, useEffect } from "react";
import "./styles/Filter.css";
import { useSearchParams } from "react-router-dom";
import { HomeProvider } from "./HomeContext.js";
import SideBar from "./SideBar.js";
import MainContent from "./MainContent.js";
import Heading from "./Heading.js";
function Home() {
  const [selectedTags, setSelectedTags] = useState([]);
  return (
    <div>
      <Heading />
      <div class="container1">
        <HomeProvider value={{selectedTags,setSelectedTags}}>
          <SideBar />
          <MainContent />
        </HomeProvider>
      </div>
    </div>
  );
}

export default Home;
