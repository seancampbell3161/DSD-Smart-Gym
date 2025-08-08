import React, { useState, type ChangeEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type {
  TwoSelectedYears,
  TwoYearInputProps,
} from "../../types/Analytics.interface.ts";

const YearlyRange: React.FC<TwoYearInputProps> = ({
  pattern,
  setInvalidYearFormat,
  setSelectedYears,
}) => {
  const [yearInputs, setYearInputs] = useState<TwoSelectedYears>({
    yearOne: "",
    yearTwo: "",
  });

  const handleYearUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setYearInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleYearlyRangeRetrieve = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { yearOne, yearTwo } = yearInputs;
      //  @ts-ignore: TS2345
      if (yearOne === "" && yearTwo === "") {
        setSelectedYears(yearInputs);
      } else if (!pattern.test(yearOne) || !pattern.test(yearTwo)) {
        setInvalidYearFormat(true);
        setTimeout(() => {
          setInvalidYearFormat(false);
        }, 4000);
        throw new Error("Invalid year format");
      } else {
        setSelectedYears(yearInputs);
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
          name="yearOne"
          value={yearInputs.yearOne}
          onChange={handleYearUpdate}
        />
        <Form.Control
          aria-label="end year"
          placeholder="End Year (YYYY)"
          name="yearTwo"
          value={yearInputs.yearTwo}
          onChange={handleYearUpdate}
        />
        <Button variant="outline-secondary" id="button-addon1" type="submit">
          Retrieve
        </Button>
      </InputGroup>
    </Form>
  );
};

export default YearlyRange;
