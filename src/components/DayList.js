import DayListItem from "./DayListItem";
import React from "react";

function DayList(props) {
  const days = props.days.map((day, idx) => {
    return (
      <DayListItem
        name={day.name}
        setDay={props.onChange}
        spots={day.spots}
        selected={day.name === props.value}
        key={idx}
      />
    );
  });
  return <ul>{days}</ul>;
}

export default DayList;
