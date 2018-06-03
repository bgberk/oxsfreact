import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import Template from './containers/Template'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

//set up graphql endpoint
const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjhcz4ip800b40158vn7l4p00'
})

//wrap everything for data & routing
const App = () => (
	<ApolloProvider client={client}>
		<BrowserRouter>
			<Template />
		</BrowserRouter>
	</ApolloProvider>
	)

ReactDOM.render(<App />,
	document.getElementById('root'));
registerServiceWorker();
