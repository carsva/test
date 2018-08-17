import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
