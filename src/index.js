import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import Template from './containers/Template'

ReactDOM.render(
	<BrowserRouter>
		<Template />
	</BrowserRouter>,
	document.getElementById('root'));
registerServiceWorker();
