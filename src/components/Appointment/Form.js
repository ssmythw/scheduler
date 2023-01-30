import React, { Component, useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

function Form(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState(props.student ? props.student : "");
  const [interviewer, setInterviewer] = useState(
    props.interviewer ? props.interviewer : null
  );

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

  const validate = () => {
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    props.onSave(name, interviewer);
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
            data-testid="student-name-input"
          />
          <section style={{ color: "red" }}>{error}</section>
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
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
