import React, { Component } from 'react';
import { AppConsumer } from '../AppContext';

class Main extends Component {
 
  render() {
    return (
      <AppConsumer>
        {context => (
          <div>Hello!</div>
        )}
      </AppConsumer>
    );
  }
}

export default Main;
