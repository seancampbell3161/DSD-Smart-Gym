import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { InvalidYearFormatProps } from "../../types/Analytics.interface.ts";

const YearlyRange: React.FC<InvalidYearFormatProps> = ({
  pattern,
  setInvalidYearFormat,
}) => {
  const [yearOne, setyearOne] = useState<string | undefined>(undefined);
  const [yearTwo, setyearTwo] = useState<string | undefined>(undefined);

  const handleYearlyRangeRetrieve = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //  @ts-ignore: TS2345
      if (!pattern.test(yearOne) || !pattern.test(yearTwo)) {
        setInvalidYearFormat(true);
        setTimeout(() => {
          setInvalidYearFormat(false);
        }, 4000);
        throw new Error("Invalid year format");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleYearlyRangeRetrieve}>
      <InputGroup className="yearly-range">
        <InputGroup.Text>Range</InputGroup.Text>
        <Form.Control
          aria-label="start year"
          placeholder="Start Year (YYYY)"
          onChange={(e) => setyearOne(e.target.value)}
        />
        <Form.Control
          aria-label="end year"
          placeholder="End Year (YYYY)"
          onChange={(e) => setyearTwo(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon1" type="submit">
          Retrieve
        </Button>
      </InputGroup>
    </Form>
  );
};

export default YearlyRange;
