import React from 'react';
import Questionnaire from './Questionnaire'; // Adjust the path accordingly

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Remove the logo and associated code */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}

        {/* Render the Questionnaire component */}
        <Questionnaire />

        {/* You can keep or remove the link to React documentation */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

