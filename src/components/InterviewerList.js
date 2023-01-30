import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {

  //Map through interviews and create an interview list item for each of the interviewers.
  const interviewersParsed = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        key={interviewer.id}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersParsed}</ul>
    </section>
  );
}

export default InterviewerList;
