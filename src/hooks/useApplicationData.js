import Axios from "axios";
import { useEffect, useState } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  //Use local API to popualte that state. 3 Endpoints are used and promise.all is used
  //in order to get all values in the then().

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers"),
    ]).then((all) => {
      setState({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return Axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({ ...prev, appointments }));
      const days = updateSpots();
      setState((prev) => ({ ...prev, days }));
    });
  };

  /*
    the interview key in the appointments object starts off as null
    but after we run this function it should update the interview object
    to what is set in the application. Takes in the appoiontment id and 
    interview object from the Form component.
    */

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return Axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({ ...prev, appointments }));
      const days = updateSpots();
      setState((prev) => ({ ...prev, days }));
    });
  };

  const updateSpots = (mode) => {
    let day = state.days.find((day) => {
      return day.name === state.day;
    });
    //get list of appoointments from the day object
    let spots = 0;
    const appointments = day.appointments;
    //return a list of appointments from the appointments objects where to keys match the day object
    //count the total number that have an interview set to null
    appointments.forEach((item) => {
      if (state.appointments[item].interview === null) spots++;
    });
    //update the spots property in the state to be the new value of spots

    let days = state.days;
    let currDay = days[day.id - 1];
    currDay.spots = spots;
    days[(day.id = 1)] = currDay;
    console.log(currDay);
    return days;
  };

  return {
    state,
    setDay,
    cancelInterview,
    bookInterview,
    updateSpots,
  };
};

export default useApplicationData;
