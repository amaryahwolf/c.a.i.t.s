import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import back1 from "./images/back1.jpg";

const styles = {
  font: {
    fontFamily: "'VT323', monospace"
  }
}

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      // 'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div
      className="bg_image"
      style={{
        backgroundImage: 'url(' + back1 + ')',
        backgroundSize: "cover",
        height: "100vh",
        fontFamily: "'VT323', monospace",
      }
      }

    >
      <ApolloProvider client={client}>


        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/login"
                  element={<Login />}
                />
                <Route
                  path="/signup"
                  element={<Signup />}
                />
                <Route
                  path="/me"
                  element={<Profile />}
                />
                <Route
                  path="/contact"
                  element={<Contact />}
                />
                <Route
                  path='*'
                  element={<h1 className="display-2">Wrong page!</h1>}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}


export default App;
