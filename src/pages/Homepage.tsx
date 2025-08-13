import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import yogaVideo from "../assets/yoga.mp4";
import posImage from "../assets/pos.jpg";
import boxingImage from "../assets/boxing-class.jpg";
import workoutImage from "../assets/workout.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import "../styles/homepage.css";
import "../styles/HomepageNavBar.css";
import ApiHandler from "../utils/ApiHandler";

type UserRole = "admin" | "member" | "trainer";

interface LoginResponse {
  authToken: string;
  user?: {
    email: string;           
    role: UserRole;
    gym_id?: string;
  };
}

const Homepage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Backend should return: { authToken, user: { email, role, gym_id? } }
      const data = (await ApiHandler.login(email, password)) as LoginResponse;

      const token = data?.authToken;
      const role = data?.user?.role;
      const userEmail = data?.user?.email;
      const gym_id = data?.user?.gym_id;

      if (!token || !role || !userEmail) {
        throw new Error("Missing fields from server (authToken, user.email, user.role).");
      }

  
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", userEmail);
      if (gym_id) localStorage.setItem("gym_id", String(gym_id));

      setMessage("✅ Logged in successfully!");
      setEmail("");
      setPassword("");

      
      navigate(role === "admin" ? "/admin" : "/member", { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);
      setMessage(`❌ Login failed: ${err?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="dark" type="submit" id="submit-button" disabled={loading}>
                  {loading ? "Logging in…" : "Log in"}
                </Button>
              </Form>

              {message && <p className="login-message">{message}</p>}
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
            Turn data into deeper engagement. Our analytics help you create a gym experience that feels personal and community-driven.
          </p>
        </div>

        <div>
          <img alt="boxing class" src={boxingImage} />
          <h3>Sweat Together. Get Stronger.</h3>
          <p>
            Getting fit the smart way. Our intuitive class management makes it easy for members to build a routine that works for them.
          </p>
        </div>

        <div>
          <img alt="transaction taking place" src={posImage} />
          <h3>Fast Checkouts. Smarter Business.</h3>
          <p>
            Streamline sales with a smart, built-in POS system—manage café orders, track inventory, and process payments effortlessly, all from one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;