import React from "react";

import {Route, Routes} from "react-router-dom";
import Main  from './pages/Main';
import Summoner  from './pages/Summoner';

function App() {

  return (
        <Routes>
            <Route exact path="/" element={<Main/>} />
            <Route exact path="/summoner/:userName" element={<Summoner/>} />
        </Routes>
  );
}

export default App;
