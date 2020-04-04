import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));