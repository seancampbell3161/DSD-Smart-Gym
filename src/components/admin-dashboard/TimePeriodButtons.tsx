import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const TimePeriodButtons: React.FC = () => {
  return (
    <ButtonGroup aria-label="Basic example">
      <Button variant="secondary">Yearly</Button>
      <Button variant="secondary">Monthly</Button>
      <Button variant="secondary">Weekly</Button>
    </ButtonGroup>
  )
}

export default TimePeriodButtons;