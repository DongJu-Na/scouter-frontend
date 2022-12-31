import React from "react";

import {Route, Routes} from "react-router-dom";
import Main from './pages/Main';


function App() {
  return (
        <Routes>
            {/* <Route exact path="/summoner/userName=:userName" element={Summoner} /> */} 
            <Route exact path="/scouter-frontend/" element={<Main/>} />
        </Routes>
  );
}

export default App;
