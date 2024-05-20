import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BasicQuestion.css';
import catHeaderBasic from '../images/headerbasicwithshadow.png';
import pawButtonNext from '../images/detailed_next_button.png';
import pawButtonPrev from '../images/detailed_prev_button.png';
import minecraftSound from '../sounds/ButtonClick.mp3';
import loadingSound from '../sounds/C418 - Haggstrom - Minecraft Volume Alpha-[AudioTrimmer.com].mp3';
import OpenAI from 'openai';
import Loading from '../loading-results/Loading';
import MusicPlayer from '../minecraft-music/Music';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';
import MewSound from '../sounds/Cat Meow - Minecraft Sound Effect (HD).mp3';
import ProgressBar from '../components/ProgressBar';

//Global constant that embed the sound of Minecraft Click whenever any methods (associated with a button) are called 
const playClickSound = () => {
  const audio = new Audio(minecraftSound);
  audio.play();
};
//Global constant that embed the sound of Minecraft Cat Meow whenever any methods (associated with a button) are called 
const playSubmitSound = () => {
  const audio = new Audio(MewSound);
  audio.play();
};
const audio_wait = new Audio(loadingSound);
//The prompt that will pass into Completion call
const prompt = `You are tasked with creating a concise and readable career suggestions report fully in HTML format stylized with CSS. All text should be black using CSS.
    You will be provided quiz-takers answers to career-based questions. You will use this information to generate the suggestions. Center all text.
    Do not include any quotation marks in the report. Do not include any html tags in the report. Do not preset the font size in any css styling. 
    Add padding to each section title. Only include what I tell you to.

    There are 4 sections: Strengths and Work Environment, Possible Careeer Industries, and Jobs in Top Career Industry. 
    For each section, wrap them in a seperate card component, each card should have a margin-bottom of 30px, a border-radius of 25px. 
    The title of each section should have a margin-top of 15px.
    Make the width of each section equals and wide, this is important!.
    Each section background-color is: #FACB7F.
    Include box shadow to each section.

    Strengths and Work Environment: Generate a personal paragraph with a 30px font size that includes the quiz-taker's personal strengths and preferences for a work environment. 
    Use "you" statements. Add bold to the title of the section, title of the section should have font-size of 40px, all Capitalized to the title of the section and style the title fontFamily: "Minecraft", this is important. Center all content.

    Possible Career Industries: List 3 industries that match the quiz-taker, along with 3 famous people in each industry. They should be labeled "Famous people: " directly underneath the industry name.
    Do not use bullet points, just list the famous people in one line.
    The first industry should be their top match and
    should be labeled as "Top Industry Match: ", bolded. Bold each industry name. Use a font size of 30px and no bullet points.
    Add bold to the title of the section, title of the section should have font-size of 40px, all Capitalized to the title of the section and style the title fontFamily: "Minecraft",this is important. Center all content.

    Jobs in Top Career Industry: List 5 well-fitting jobs in the top career industry identified in the previous section, 
    along with their average salary in an HTML table. Use a font size of 26px and create an HTML table with the following specifications:
    Job Name and Average Salary boxes should have a background color of #FFA3B1, this is important.
    Rest of the table boxes should have a background color of #F3CACA.
    Include black lines that mark each row and column.
    The table should have a border-radius of 15px and margin-bottom 25px, this is important.
    Bold the Job Name and Average Salary text.
    Add bold to the title of the section,title of the section should have font-size of 40px, all Capitalized to the title of the section and style the title fontFamily: "Minecraft",this is important. Center all content.

    Job Descriptions: Provide descriptions for each of the listed jobs, with each description being at least five sentences long. 
    Use a font size of 26px for the description. Each job's title should be bold. Add bold to the title of the section, title of the section should have font-size of 40px, all Capitalized to the title of the section and style the title fontFamily: "Minecraft",this is important. Center all content.

    Below are the quiz questions along with the quiz-takers answers. Use this information to generate the report following the format above.`;
//An array of question with its answer choices
const questions = [
  {
    question: 'Question 1: If you have a year paid-time off and the company gives you money to pursue every interest you want, what would you choose to do with that time?',
    answers: ['Learn programming', 'Travel', 'Go to workshops and make more connections', 'I do not know yet, will go with the flow', 'Learn several sports'],
  },
  {
    question: 'Question 2: When working on a team project, you are most likely to:',
    answers: ['Take on a leadership role and delegate tasks to others.', 'Contribute ideas and insights during brainstorming sessions.', 'Support your team members and ensure everyone voices are heard.', 'Focus on completing your assigned tasks efficiently and effectively.'],
  },
  {
    question: 'Question 3: Reflect on your past experiences working in teams. Do you thrive in collaborative environments, enjoying the synergy of different perspectives, or do you prefer to work independently, focusing on your own tasks and goals?',
    answers: ['I prefer working alone','I prefer working with people'],
  },
  {
    question: 'Question 4: Reflect on your problem-solving approach. Do you excel at finding innovative solutions to complex challenges, thinking outside the box and embracing ambiguity, or do you prefer to analyze data and follow established procedures to reach a solution?',
    answers: ['I prefer making careful analytics and following an established procedure', 'I love thinking of new ways to solve a problem'],
  },
  {
    question: 'Question 5: Reflect on your organizational skills. Do you thrive in environments where you can meticulously plan and organize tasks, ensuring everything runs smoothly, or do you prefer more flexibility and adaptability, thriving in situations that require quick decision-making and problem-solving?',
    answers: ['I want to make detailed plans and make sure everything is super organized','I want to focus more on adaptability and problem solving on the spot'],
  },
  {
    question: 'Question 6: What motivates you the most in your career: achieving recognition and success, making a positive impact on others or society, or continuous learning and growth?',
    answers: ['I want to have achievements and recognition', 'I want to make a positive impact on the world', 'I want to learn and grow during my career trajectory'],
  },
  {
    question: 'Question 7: How do you prefer to communicate with colleagues and clients: face-to-face interactions, written communication (emails, reports), or virtual meetings and video calls?',
    answers: ['I definitely want to meet them in person', 'Written communication is my strong suits', 'I prefer having virtual meeting and video calls'],
  },
];
//Getting API key from local storage
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const Questionnaire: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const [key] = useState<string>(keyData);
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitDisabled = selectedAnswers.includes('');
  const musicPlayerRef = useRef<any>(null);
//useEffect that checks the loading status (when hitting the submit button) in order to play the submitting music, ChatGPT assisted
  useEffect(() => {
    if (isLoading) {
      audio_wait.loop = true;
      audio_wait.play();
    } else if (audio_wait) {
      audio_wait.pause();
      audio_wait.currentTime = 0;
    }
    return () => {
      if (audio_wait) {
        audio_wait.pause();
        audio_wait.currentTime = 0;
      }
    };
  }, [isLoading]);
  //Set the current selected answer
  const handleAnswerSelection = (answerIndex: number) => {
    playClickSound();
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = questions[currentQuestionIndex].answers[answerIndex];
    setSelectedAnswers(newSelectedAnswers);
  };
//Validate whether or not the user is missing an answer and alert them through a pop up window
  const validateAnswers = () => {
    const missingQuestions = selectedAnswers
      .map((answer, index) => (answer === '' ? index + 1 : null))
      .filter((index) => index !== null);

    if (missingQuestions.length > 0) {
      window.alert(`You are missing answers for the following questions: ${missingQuestions.join(', ')}`);
      return false;
    }
    return true;
  };
//Increase the currnet question index by 1 when clicking the next button
  const handleNextQuestion = () => {
    playClickSound();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
//Decrease the current question index by 1 when clicking the previous button
  const handlePreviousQuestion = () => {
    playClickSound();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
//Set the current question index to be the one that get passed in the parameter
  const handleQuestionJump = (index: number) => {
    playClickSound();
    setCurrentQuestionIndex(index);
  };
//Round the percentage of the index to show on the progress bar
  const progress = Math.round(((currentQuestionIndex + 1)/ questions.length) * 100);
  const answeredCount = selectedAnswers.filter(answer => answer !== '').length;
  const progressPercentage = (answeredCount / questions.length) * 100;
//Handling API call, detailed documentations below:
  const handleSubmission = async () => {
    //Stop the current song that the Music Player component is playing.
    musicPlayerRef.current.stopMusic();
    //Play the cat meow sound
    playSubmitSound();
    //Validation check to make sure the user has answered all the questions
    if (!validateAnswers()) {
      return;
    }
    //Set the loading status to true to show the loading screen and play loading music
    setIsLoading(true);
    console.log('Submitting...');
    //Creating a new openAI object with the given API key
    try {
      const openAI = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true,
      });
//Creating a new completion object and set the role of the system and user, passing in the 
//prompt and selected answers
      const completion = await openAI.chat.completions.create({
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: `My answers are: ${selectedAnswers.join('\n')}` }
        ],
        model: 'gpt-4o',
      });

      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('API call completed');
      //Pass the result to the address of the basicresult page
      if (completion.choices[0].message.content != null) {
        navigate('/BasicResult', { state: { result: completion.choices[0].message.content } });
      } else {
        console.log('Error! Maybe you forgot the API key.');
      }
    } catch (error) {
      console.error('Error in OpenAI integration:', error);
    } finally {
      setIsLoading(false);
      console.log('Loading set to false');
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <img
            src={catHeaderBasic}
            alt="cat-header-basic"
            className='cat-header-basic'
          />
        <BootstrapProgressBar style={{ width: '30vw' }} className='simple-progress-bar' min={0} max={100} now={progressPercentage} animated striped />
          <div className="questionnaire-container">
           <div className="music-and-jump">
                <div className="question-jump-buttons">
                  {questions.map((_, index) => (
                    <button
                      id="each-jump"
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      className={`question-jump-button ${currentQuestionIndex === index ? 'active' : ''}`}
                      style={{
                        backgroundColor: selectedAnswers[index] !== '' ? '#FAA4A4' : '',
                      }}
                    >
                      #{index + 1}
                    </button>
                  ))}
                </div>
              <div id="music-basic">
              <MusicPlayer ref={musicPlayerRef} />
              </div>
              </div>
                <div key={currentQuestionIndex} className="question">
                  <h3 className="question-text">{questions[currentQuestionIndex].question}</h3>
                  <div className="answer-options">
                    {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
                      <button
                        key={answerIndex}
                        onClick={() => handleAnswerSelection(answerIndex)}
                        className={`answer-option ${selectedAnswers[currentQuestionIndex] === answer ? 'selected' : ''}`}
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                  <ProgressBar progress={progress} />
                </div>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className='previous-button'
                style={{
                  backgroundImage: `url(${pawButtonPrev})`,
                  backgroundSize: 'cover',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#FFA3B1',
                  fontSize: '15px',
                  color: 'black',
                  borderRadius: '50%',
                }}
              ></button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button
                onClick={handleSubmission}
                className="submit-button"
                disabled={isSubmitDisabled}
                style={{
                  display: isSubmitDisabled ? 'none' : 'block'
                }}
              >
                Submit
              </button>
            )}
            {currentQuestionIndex !== questions.length - 1 && (
              <button
                onClick={handleNextQuestion}
                className="next-button"
                style={{
                  backgroundImage: `url(${pawButtonNext})`,
                  backgroundSize: 'cover',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#FFA3B1',
                  fontSize: '15px',
                  color: 'black',
                  borderRadius: '50%',
                }}
              ></button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Questionnaire;