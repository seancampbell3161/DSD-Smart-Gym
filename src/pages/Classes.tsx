import React, {useState} from 'react';
import ClassList from "../components/Dashboard/ClassList";
import cycling from '../assets/cycling-class.png';
import boxing from '../assets/boxing-class.jpg';
import yoga from '../assets/yoga-class.png';
import hiit from '../assets/hiit-class.png';
import strength from '../assets/strength-training.png';
import gym from '../assets/gym.png';


const Classes: React.FC = () => {

  const classList = [
    {
    name: 'cycling',
    type: 'bike Ride',
    description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    img: cycling
  },
   {
    name: 'boxing',
    type: 'bike Ride',
    description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    img: boxing
  },
   {
    name: 'yoga',
    type: 'bike Ride',
    description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    img: yoga
  },
   {
    name: 'HIIT',
    type: 'High Intensity interval training',
    description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    img: hiit
  },
   {
    name: 'strength training',
    type: 'resistance based weight training',
    description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    img: strength
  },
]

const [backgroundImage, setBackgroundImage] = useState<string | null>(gym);
  
// Footer logic here


  return (
    <div
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})`: gym ,
        backgroundSize: "cover",
        backgroundPosition: "top",
        transition: "background-image 0.3s ease",
        minHeight: "100vh",
      }}
    >
      <ClassList
      classes={classList}
      setBackgroundImg={setBackgroundImage}
      />
      {/* Footer content */}
    </div>
  );
};

export default Classes;