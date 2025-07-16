import yogaVideo from "../assets/yoga.mp4";
import posImage from "../assets/pos.jpg";
import boxingImage from "../assets/boxing-class.jpg";
import workoutImage from "../assets/workout.jpg";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import "../styles/homepage.css";
import { useState } from "react";



const Homepage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO: Add fetch request and handle payload
    setEmail('');
    setPassword('');
  }

  return (
    <div className="homepage">
      <div className="homepage-banner">
        <h2>Smarter Fitness. Wherever You Are.</h2>
        <h3>Discover a smarter all-in-one health solution.</h3>
        <Accordion className="login-container">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Log into your smart experience</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
                <Button variant="dark" type="submit" id="submit-button">
                  Log in
                </Button>
              </Form>   
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>     
      </div>
      <video autoPlay muted loop>
        <source src={yogaVideo} type="video/mp4" />
      </video>
      <div className="feature-panel">
        <div>
          <img alt="two guys exercising" src={workoutImage} />
          <h3>Insights That Power Performance.</h3>
          <p>
            Turn data into deeper engagement. Our analytics help you create a
            gym experience that feels personal and community-driven.
          </p>
        </div>
        <div>
          <img alt="boxing class" src={boxingImage} />
          <h3>Sweat Together. Get Stronger.</h3>
          <p>
            Getting fit the smart way. Our intuitive class management makes it
            easy for members to build a routine that works for them.
          </p>
        </div>
        <div>
          <img alt="transaction taking place" src={posImage} />
          <h3>Fast Checkouts. Smarter Business.</h3>
          <p>
            Streamline sales with a smart, built-in POS system—manage café
            orders, track inventory, and process payments effortlessly, all from
            one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
