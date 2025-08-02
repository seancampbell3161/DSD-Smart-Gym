import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { InvalidYearFormatProps } from "../../types/Analytics.interface.ts";

const YearlyComparison: React.FC<InvalidYearFormatProps> = ({
  pattern,
  setInvalidYearFormat,
}) => {
  const [yearOne, setYearOne] = useState<string | undefined>(undefined);
  const [yearTwo, setYearTwo] = useState<string | undefined>(undefined);

  const handleYearlyComparisonRetrieve = (e: React.FormEvent) => {
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
    <Form onSubmit={handleYearlyComparisonRetrieve}>
      <InputGroup className="yearly-comparison">
        <Form.Control
          aria-label="year"
          placeholder="Year (YYYY)"
          onChange={(e) => setYearOne(e.target.value)}
        />
        <InputGroup.Text>vs</InputGroup.Text>
        <Form.Control
          aria-label="year"
          placeholder="Year (YYYY)"
          onChange={(e) => setYearTwo(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon1" type="submit">
          Retrieve
        </Button>
      </InputGroup>
    </Form>
  );
};
export default YearlyComparison;
