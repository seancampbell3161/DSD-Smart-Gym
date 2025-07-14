import yogaVideo from "../assets/yoga.mp4";
import posImage from "../assets/pos.jpg";
import boxingImage from "../assets/boxing-class.jpg";
import workoutImage from "../assets/workout.jpg";
import "../styles/homepage.css";

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="homepage-banner">
        <h2>Smarter Fitness. Wherever You Are.</h2>
        <h3>Discover a smarter all-in-one health solution.</h3>
        <button>Join The Movement</button>
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
