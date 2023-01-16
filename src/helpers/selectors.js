/*
getAppointmentsForDay retrieves a list of appointments speicified by a certain day 
(day parameter). This function uses the day.appointments slice of the state to get the appointment id's
then returns the appointments objects from the appointments slice of the state.
*/

function getAppointmentsForDay(state, day) {
  let selectedDay;

  //Get the specific day object that is referred to by the day parameter
  for (let item of state.days) {
    if (item.name === day) {
      selectedDay = item;
    }
  }

  //If that day is not in the state then return an empty array.
  if (!selectedDay) {
    return [];
  }

  let appointments = [];

  for (let item of selectedDay.appointments) {
    const appointment = state.appointments[item];
    appointments.push(appointment);
  }
  return appointments;
}

/*
getInterviewersForDay returns a list of interviewers for a particular day as indicated
by the day parameter that is passed in. 
*/

function getInterviewersForDay(state, day) {
  let selectedDay;

  //Get the specific day object that is referred to by the day parameter
  for (let item of state.days) {
    if (item.name === day) {
      selectedDay = item;
    }
  }

  if (!selectedDay) {
    return [];
  }

  let interviewers = [];

  for (let item of selectedDay.interviewers) {
    const interviewer = state.interviewers[item];
    interviewers.push(interviewer);
  }
  return interviewers;
}

/*
getInterview returns an object containing itnerview specific information pertaining to the 
interview tied to a particular appointment. It uses the interviewer id in a particular appointment 
then returns the interviewer object with that id from the interviewers slice of state. 
*/

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  let interviewObj = {};
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
};

module.exports = { getAppointmentsForDay, getInterviewersForDay, getInterview };
