import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
//import AppMock from './AppMock';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/*<AppMock />*/}
    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);
=======
import { BrowserRouter } from 'react-router-dom';

//style
import './index.css';
>>>>>>> db1c1326e2f73aa534afce593c761a1f059305da

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)