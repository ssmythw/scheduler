/*
There is often a need to compute new data from existing state in an application. To do this we can use a selector, a 
function that accepts state as an argument and returns data that is derived from that state.
*/

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

module.exports = { getAppointmentsForDay };
