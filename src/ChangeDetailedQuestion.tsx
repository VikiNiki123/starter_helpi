import React, { useState } from "react";
import './App.css';
import { Button, Container, Row , Col, Form} from "react-bootstrap";
import './App.css'; // need to make a sep file for this


export function ChangeDetailedQuestion(): JSX.Element {
    const [question, setQuestion] = useState<string>("Imagine you are assigned to a project team in which you will be creating a marketing campaign for a new product launch. Which aspect of the project would you most enjoy focusing on?");

    function changeQuestion(questionNum: number): void {
        if(questionNum === 1){
            setQuestion("Imagine you are assigned to a project team in which you will be creating a marketing campaign for a new product launch. Which aspect of the project would you most enjoy focusing on?");
        } else if(questionNum === 2){
            setQuestion("Describe the overarching goals, values, and aspirations that resonate with you. Consider the impact you aim to make and the principles that guide your actions and decisions.");
        } else if(questionNum === 3){
            setQuestion("Question 3");
        } else if(questionNum === 4){
            setQuestion("Question 4");
        } else if(questionNum === 5){
            setQuestion("Question 5");
        } else if(questionNum === 6){
            setQuestion("Question 6");
        } else if(questionNum === 7){
            setQuestion("Question 7");
        } else if(questionNum === 8){
            setQuestion("Question 8");
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <span>
                <div className="Question-row">
                <Container>
                <Row className="Horizontal-questions">
                <Col className="Question-1" xs={2}>
                    <Button onClick={() => changeQuestion(1)}>1</Button>
                    </Col>
                    <Col className="Question-2" xs={2}>
                    <Button onClick={() => changeQuestion(2)}>2</Button>
                    </Col>
                    <Col className="Question-3" xs={2}>
                    <Button onClick={() => changeQuestion(3)}>3</Button>
                    </Col>
                    <Col className="Question-4" xs={2}>
                    <Button onClick={() => changeQuestion(4)}>4</Button>
                    </Col>
                    <Col className="Question-5" xs={2}>
                    <Button onClick={() => changeQuestion(5)}>5</Button>
                    </Col>
                    <Col className="Question-6" xs={2}>
                    <Button onClick={() => changeQuestion(6)}>6</Button>
                    </Col>
                    <Col className="Question-7" xs={2}>
                    <Button onClick={() => changeQuestion(7)}>7</Button>
                    </Col>
                </Row>
                </Container>
            </div>

            <div className="Question-textbox">
                <p>{question}</p>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {question === "Imagine you are assigned to a project team in which you will be creating a marketing campaign for a new product launch. Which aspect of the project would you most enjoy focusing on?" && (
                <Container style={{ width: '75%', justifyContent: 'center' }}>
                    <Row className="First-answer-row" style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', height: 'auto' }}>
                        <Form.Check
                            type="radio"
                            name="Question1"
                            id="emotion-check-happy"
                            label="Crafting a compelling message and storytelling to communicate the product's unique value, helping it resonate with the target audience."
                            inline
                            style={{ display: 'inline-block', width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '5px 0' }}
                        />
                        <Form.Check
                            type="radio"
                            name="Question1"
                            id="emotion-check-sad"
                            label="Collaborating with creative teams to design visually appealing graphics, videos, and other multimedia content that capture attention and drive engagement."
                            inline
                            style={{ display: 'inline-block', width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '5px 0' }}
                        />
                    </Row>

                    <Row className="Second-answer-row" style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', height: 'auto' }}>
                        <Form.Check
                            type="radio"
                            name="Question1"
                            id="emotion-check-neutral"
                            label="Providing strategic direction and guidance to team members, ensuring alignment with overall campaign objectives and messaging consistency across different channels."
                            inline
                            style={{ display: 'inline-block', width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '5px 0' }}
                        />
                        <Form.Check
                            type="radio"
                            name="Question1"
                            id="emotion-check-confused"
                            label="Conducting market research and consumer behavior analysis to identify key insights and opportunities, informing campaign strategies and tactics for maximum impact."
                            inline
                            style={{ display: 'inline-block', width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '5px 0' }}
                        />
                    </Row>
                </Container>
                )}

                {question === "Describe the overarching goals, values, and aspirations that resonate with you. Consider the impact you aim to make and the principles that guide your actions and decisions." && (   
                <Container style={{ width: '75%', justifyContent: 'center' }}>
                    <Row className="First-answer-row" style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', height: 'auto' }}>
                        <Form.Check
                            type="radio"
                            name="Question2"
                            id="emotion-check-happy"
                            label="I aspire to be a visionary leader and trailblazer in my field, pushing the boundaries of innovation and driving positive change that leaves a lasting legacy, inspiring others to follow in my footsteps and make a difference in the world."
                            inline
                            style={{ display: 'inline-block', width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '5px 0' }}
                        />
                        <Form.Check
                            type="radio"
                            name="Question2"
                            id="emotion-check-sad"
                            label="I am driven by a deep-seated desire to make a meaningful impact on society and contribute to the greater good, leveraging my skills, resources, and influence to address pressing social and environmental challenges and create a more equitable and sustainable future for all."
                            inline
                            style={{ display: 'inline-block', width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '5px 0' }}
                        />
                    </Row>

                    <Row className="Second-answer-row" style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', height: 'auto' }}>
                        <Form.Check
                            type="radio"
                            name="Question2"
                            id="emotion-check-neutral"
                            label="I am committed to personal and professional growth, continuously challenging myself to learn, evolve, and expand my horizons, striving for excellence and mastery in my craft while fostering a culture of continuous improvement and lifelong learning."
                            inline
                            style={{ display: 'inline-block', width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '5px 0' }}
                        />
                        <Form.Check
                            type="radio"
                            name="Question2"
                            id="emotion-check-confused"
                            label="Providing strategic direction and guidance to team members, ensuring alignment with overall campaign objectives and messaging consistency across different channels."
                            inline
                            style={{ display: 'inline-block', width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', margin: '5px 0' }}
                        />
                    </Row>
                </Container>
                    )}
                </div>
            </span>
        </div>
    );
}
