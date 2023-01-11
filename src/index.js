import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';

import App from './App';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <RecoilRoot>
      <BrowserRouter basename={process.env.NODE_ENV === "development"  ?  "/" : process.env.PUBLIC_URL }>
          <App />
      </BrowserRouter>
    </RecoilRoot>
  </>
  
);

//import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
