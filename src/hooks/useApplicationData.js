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
      const days = updateSpots(id, appointments)
      setState((prev) => ({ ...prev, appointments, days }));

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
      const days = updateSpots(id, appointments)
      setState((prev) => ({ ...prev, appointments, days }));
    }); 
  };

  const updateSpots = (appointmentId, appointments) => {
    const day = state.days.find(el => el.appointments.includes(appointmentId));
    const spots = day.appointments.filter(id => appointments[id].interview === null).length;
    return state.days.map(el => el.appointments.includes(appointmentId) ? {...el, spots} : el);
  };

  return {
    state,
    setDay,
    cancelInterview,
    bookInterview
  };
};

export default useApplicationData;
