import React from "react";

import {Route, Routes} from "react-router-dom";
import Main  from './pages/Main';
import Summoner  from './pages/Summoner';
import Login from "./pages/Login";

function App() {

  return (
        <Routes>
            <Route exact path="/" element={<Main/>} />
            <Route exact path="/summoner/:userName" element={<Summoner/>} />
            <Route exact path="/login" element={<Login/>} />
        </Routes>
  );
}

export default App;
