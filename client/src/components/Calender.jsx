import React, { useState } from "react";

import { Form } from "react-bootstrap";

const Calender = (props) => {
  const { calenderDate, setCalenderDate, setShowCalenderMessage } = props;

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Form.Group controlId="dob">
            {/* <Form.Label>Select Date</Form.Label> */}
            <Form.Control
              type="date"
              name="datePicker"
              placeholder="Date of Birth"
              onChange={(e) => {
                setCalenderDate(new Date(e.target.value).toISOString());
                setShowCalenderMessage(false);
              }}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default Calender;
