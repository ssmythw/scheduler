function getAppointmentsForDay(state, day) {
  /*
    We need to start by finding the object in our state.days array who's name matches the provided day. 
    With this information we can now access that specific days appointment array.
    */
  let selectedDay;

  for (let item of state.days) {
    if (item.name === day) {
      selectedDay = item;
    }
  }

  if (!selectedDay) {
    return [];
  }
  /*
  Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing 
  where it's id matches the id of states.appointments and return that value.
  */

  let appointments = [];

  for (let item of selectedDay.appointments) {
    const appointment = state.appointments[item];
    appointments.push(appointment);
  }
  return appointments;
}

function getInterviewersForDay(state, day) {
  /*
    We need to start by finding the object in our state.days array who's name matches the provided day. 
    With this information we can now access that specific days appointment array.
    */
  let selectedDay;

  for (let item of state.days) {
    if (item.name === day) {
      selectedDay = item;
    }
  }

  if (!selectedDay) {
    return [];
  }
  /*
  Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing 
  where it's id matches the id of states.appointments and return that value.
  */

  let interviewers = [];

  for (let item of selectedDay.interviewers) {
    const interviewer = state.interviewers[item];
    interviewers.push(interviewer);
  }
  return interviewers;
}

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  let interviewObj = {};
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
};

//getInterview(state, state.appointments["3"].interview);

module.exports = { getAppointmentsForDay, getInterviewersForDay, getInterview };
