import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import './assets/icons/fontawesome/css/all.min.css';
import './assets/sass/app.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://beta.pokeapi.co/graphql/v1beta`
  }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
