import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../../styles/TimePeriodButtons.css";
import type { TimeOptions } from "../../types/TimeOptions";

interface TimePeriodButtonProps {
  timePeriod: TimeOptions;
  setTimePeriod: React.Dispatch<React.SetStateAction<TimeOptions>>;
}

const TimePeriodButtons: React.FC<TimePeriodButtonProps> = ({
  timePeriod,
  setTimePeriod,
}) => {
  return (
    <ButtonGroup aria-label="Basic example">
      <Button
        className={timePeriod === "yearly" ? "selected" : ""}
        variant="secondary"
        onClick={() => setTimePeriod("yearly")}
      >
        Yearly
      </Button>
      <Button
        className={timePeriod === "monthly" ? "selected" : ""}
        variant="secondary"
        onClick={() => setTimePeriod("monthly")}
      >
        Monthly
      </Button>
      <Button
        className={timePeriod === "weekly" ? "selected" : ""}
        variant="secondary"
        onClick={() => setTimePeriod("weekly")}
      >
        Weekly
      </Button>
    </ButtonGroup>
  );
};

export default TimePeriodButtons;
