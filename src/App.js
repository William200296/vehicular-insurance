import React, { Fragment } from 'react';
import './App.css';
import Header from './components/Header';
import RouterOutlet from './routes/RouterOutlet';

function App() {

  return (
    <Fragment>
        <Header />
        <RouterOutlet />
    </Fragment>
  );
}

export default App;
