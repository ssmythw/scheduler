import React, { useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import Axios from "axios";
import { useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({ ...state, day });
  const parsedAppointments = dailyAppointments.map((appointment, idx) => {
    return <Appointment {...appointment} key={appointment.id} />;
  });

  useEffect(() => {
    Promise.all([Axios.get("/api/days"), Axios.get("/api/appointments")]).then(
      (all) => {
        setState({ ...state, days: all[0].data, appointments: all[1].data });
      }
    );
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
