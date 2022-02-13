import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

fetch('http://user/me')
  .then((r) => console.log(r))
  .catch((e) => console.log(e));

fetch('http://user:3001/me')
  .then((r) => console.log(r))
  .catch((e) => console.log(e));

fetch('http://localhost:3001/me')
  .then((r) => console.log(r))
  .catch((e) => console.log(e));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
