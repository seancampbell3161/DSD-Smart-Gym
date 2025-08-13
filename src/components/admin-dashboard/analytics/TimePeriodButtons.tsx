import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import type { TimeOptions } from "../../../types/Analytics.interface.ts";
import "../../../styles/TimePeriodButtons.css";

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
        className={timePeriod.button === "Yearly" ? "selected" : ""}
        variant="secondary"
        onClick={() => setTimePeriod({ button: "Yearly", tableHeader: "Year" })}
      >
        Yearly
      </Button>
      <Button
        className={timePeriod.button === "Monthly" ? "selected" : ""}
        variant="secondary"
        onClick={() =>
          setTimePeriod({ button: "Monthly", tableHeader: "Month" })
        }
      >
        Monthly
      </Button>
    </ButtonGroup>
  );
};

export default TimePeriodButtons;
