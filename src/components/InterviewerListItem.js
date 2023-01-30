import classNames from "classnames";
import React from "react";
import "./InterviewerListItem.scss";



function InterviewerListItem(props) {
  const { name, avatar, setInterviewer, selected } = props;
  const classnames = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return (
    <li onClick={setInterviewer} className={classnames}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;
