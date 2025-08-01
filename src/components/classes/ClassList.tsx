import '../../styles/ClassList.css';

type ClassItem = {
  name: string;
  type: string;
  description: string;
  img: string;
};

type Props = {
  classes: ClassItem[];
  setBackgroundImg: (img: string | null) => void;
};

export default function ClassList({classes, setBackgroundImg}: Props) {

  return (
    <div className='class-list'>
      {classes.map((item, index) =>(
        <div
          key={index}
          className='class-card'
          onMouseEnter={()=> setBackgroundImg(item.img)}
          >
            <div className='class-card-overlay'>
              <h2 className='class-name'>{item.name}</h2>
              <p className='class-type'>{item.type}</p>
              <p className='class-description'>{item.description}</p>
            </div>
        </div>
      ))

      }
    </div>
  );
}
