import React, {useState} from 'react';
import ClassList from "../components/Dashboard/ClassList";
import cycling from '../assets/cycling-class.jpg';
import boxing from '../assets/boxing-class.jpg';


const Classes: React.FC = () => {

  const classList = [
    {
    name: 'clycling',
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
    name: 'clycling',
    type: 'bike Ride',
    description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    img: cycling
  },
   {
    name: 'clycling',
    type: 'bike Ride',
    description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    img: cycling
  },
   {
    name: 'clycling',
    type: 'bike Ride',
    description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    img: cycling
  },
]

const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  
// Footer logic here


  return (
    <div
      className='classes-page'
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})`: `none`,
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