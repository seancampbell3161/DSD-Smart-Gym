import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { InvalidYearFormatProps } from "../../types/Analytics.interface.ts";

const SingleYearSelector: React.FC<InvalidYearFormatProps> = ({
  pattern,
  setInvalidYearFormat,
}) => {
  const [year, setYear] = useState<string | undefined>(undefined);

  const handleYearlyRangeRetrieve = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //  @ts-ignore: TS2345
      if (!pattern.test(year)) {
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
      <InputGroup className="single-year-selector">
        <Form.Control
          aria-label="year"
          placeholder="Year (YYYY)"
          onChange={(e) => setYear(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon1" type="submit">
          Retrieve
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SingleYearSelector;
