import React from "react";

import {Route, Routes} from "react-router-dom";
import Main  from './pages/Main';
import Summoner  from './pages/Summoner';
import Login from "./pages/Login";
import Ranking from "./pages/Ranking";
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";

function App() {

  return (
        <Routes>
            <Route exact path="/" element={<Main/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/summoner/:userName" element={<Summoner/>} />
            <Route exact path="/ranking" element={<Ranking/>} />
            <Route exact path="/community" element={<Community/>} />
            <Route exact path="/community/:id" element={<CommunityDetail/>} />
        </Routes>
  );
}

export default App;
