/*
Props (Edit story)

student:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function

State

student:String
interviewer:Number

*/

/*
Create Story 

interviewers:Array
onSave:Function
onCancel:Function

*/

import React, { Component, useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

function Form(props) {
  const [name, setName] = useState(props.student);
  const [interviewer, setInterviewer] = useState(props.interviewer);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const cancel = () => {
    props.onCancel();
    reset();
  };

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={handleNameChange}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={props.onSave} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
