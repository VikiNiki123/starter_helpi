import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-header">
          <image></image>
        </div>
        <h1>THE CAREER QUIZ!</h1>
        <nav>
          <button>Home</button>
          <button>Basic Quiz</button>
          <button>Detailed Quiz</button>
          <button>About</button>
        </nav>
        <hr></hr>
      </header>

      <body>
        <div className="homepage_body">
          <div className="homepage_quiz_section">
            <div className="homepage_box">
              <image></image>
              <h3>EASY PEASY LEMON SQUEEZY</h3>
              <p>This is the basic version of the quiz</p>
            </div>
            <button>Take Basic Questions</button>
          </div>

          <div className="homepage_quiz_section">
            <div className="homepage_box">
              <image></image>
              <h3>HAR HAR HARD</h3>
              <p>This is the detailed version of the quiz</p>
            </div>
            <button>Take Detailed Questions</button>
          </div>
        </div>
        

        <hr></hr>
      </body>

      <footer>
        <p className="team-name-footer">@SWE DREAM TEAM</p>
        <p className="contact-info-footer">@contact info</p>
        <hr></hr>
        <Form className="API_footer">
          <Form.Label>API Key: </Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
      </footer>
      
    </div>
  );
}

export default App;