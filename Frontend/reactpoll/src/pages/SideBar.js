import React from 'react'
import CreatePollBtn from './CreatePollBtn'
import Filter from './Filter'
import './styles/SideBar.css'

function SideBar() {
  return (
    <div>
        <div class="sidebar">
            <CreatePollBtn/>
            <Filter/>
        </div>
    </div>
  );
}

export default SideBar