import { Scheduler } from "@aldabil/react-scheduler";
import { it } from "date-fns/locale";
import { Button } from "@mui/material";
import moment from "moment";
import AddEventDialog from "./AddEventDialog";
import { useState, useEffect } from "react";

function App() {
  const today = moment();
  // today.set({ hour: 18, minute: 0, second: 0, millisecond: 0 });

  const [events, setEvents] = useState([
    {
      event_id: 1,
      title: "Event 1",
      editable: false,
      draggable: false,
      disabled: false,
      color: "#cae15a",
      textColor: "black",
      start: moment("2024/10/28 15:00").toDate(),
      end: moment("2024/10/28 16:00").toDate(),
    },
    {
      event_id: 2,
      title: "Event 2",
      editable: false,
      draggable: false,
      disabled: false,
      color: "#cae15a",
      textColor: "black",
      start: moment("2024/10/28 10:00").toDate(),
      end: moment("2024/10/28 11:00").toDate(),
    },
    {
      event_id: 3,
      title: "Event 3",
      editable: false,
      draggable: false,
      disabled: false,
      color: "#cae15a",
      textColor: "black",
      start: moment("2024/10/29 10:00").toDate(),
      end: moment("2024/10/29 11:00").toDate(),
    },
    {
      event_id: 4,
      title: "Event 4",
      editable: false,
      draggable: false,
      disabled: false,
      color: "#cae15a",
      textColor: "black",
      start: moment("2024/10/28 18:00").toDate(),
      end: moment("2024/10/28 19:00").toDate(),
    },
    {
      event_id: 5,
      title: "Event 5",
      editable: false,
      draggable: false,
      disabled: false,
      color: "#cae15a",
      textColor: "black",
      start: moment("2024/10/28 19:00").toDate(),
      end: moment("2024/10/28 20:00").toDate(),
    },
  ]);

  // Funzione per aggiornare `disabled` negli eventi
  const updateEventStatus = () => {
    const now = moment();
    const updatedEvents = events.map((event) => ({
      ...event,
      disabled: moment(event.start).isSameOrBefore(now),
      editable: false,
      draggable: false,
    }));
    setEvents(updatedEvents);
  };

  // Aggiorna lo stato degli eventi all'inizio e ogni minuto
  useEffect(() => {
    updateEventStatus();
  }, []);

  // Inizio e fine della settimana corrente
  const startOfWeek = today.clone().startOf("isoWeek");
  const endOfWeek = today.clone().endOf("isoWeek");

  // Controlla se oggi è un weekend
  const isWeekend = today.isoWeekday() === 6 || today.isoWeekday() === 7;

  // Calcola l'inizio e la fine della settimana successiva
  const nextWeekStart = isWeekend ? startOfWeek.clone().add(1, "weeks") : null;
  const nextWeekEnd = isWeekend ? endOfWeek.clone().add(1, "weeks") : null;

  // Determina se il giorno è disabilitato in base a today
  useEffect(() => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        const startMoment = moment(event.start);
        const isBeforeToday = startMoment.isBefore(today);
        const isCurrentWeek = startMoment.isBetween(
          startOfWeek,
          endOfWeek,
          null,
          "[]"
        );
        const isNextWeekEnabled =
          nextWeekStart &&
          startMoment.isBetween(nextWeekStart, nextWeekEnd, null, "[]");

        return {
          ...event,
          disabled:
            isBeforeToday ||
            startMoment.isSame(today, "hour") ||
            (!isCurrentWeek && !isNextWeekEnabled),
        };
      })
    );
    console.log(today);
  }, [today.hour()]);

  return (
    <>
      <Scheduler
        view="week"
        events={events}
        locale={it}
        hourFormat="24"
        disableViewNavigator={true}
        customEditor={({ ...props }) => (
          <AddEventDialog
            {...props}
            state={props.state}
            start={props.state.start.value}
            end={props.state.end.value}
            onConfirm={props.onConfirm}
            onClose={props.close}
            events={events}
            setEvents={setEvents}
          />
        )}
        week={{
          disableGoToDay: true,
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 0,
          endHour: 24,
          step: 60,

          cellRenderer: ({ height, start, onClick, ...props }) => {
            const startMoment = moment(start);
            const isBeforeToday = startMoment.isBefore(today);
            const isCurrentWeek = startMoment.isBetween(
              startOfWeek,
              endOfWeek,
              null,
              "[]"
            );

            const isNextWeekEnabled =
              nextWeekStart &&
              startMoment.isBetween(nextWeekStart, nextWeekEnd, null, "[]");

            const isDisabled =
              isBeforeToday || (!isCurrentWeek && !isNextWeekEnabled);

            return (
              <Button
                style={{
                  height: "100%",
                  width: "100%",
                  padding: "0px",
                  margin: "0px",
                  background: isDisabled ? "#eee" : "transparent",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (isDisabled) {
                    return alert("Opss, giorno disabilitato");
                  }
                  onClick();
                }}
                {...props}
              />
            );
          },
        }}
      />
    </>
  );
}

export default App;
