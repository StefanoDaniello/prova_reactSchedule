import { Scheduler } from "@aldabil/react-scheduler";
import { it } from "date-fns/locale";
import { Button } from "@mui/material";
import moment from "moment";
import AddEventDialog from "./AddEventDialog";
function App() {
  const today = moment();

  const events = [
    {
      event_id: 1,
      title: "Event 1",
      editable: false,
      draggable: false,
      disabled: false,
      color: "#cae15a",
      textColor: "black",
      start: moment("2024/10/28 09:00").toDate(),
      end: moment("2024/10/28 10:00").toDate(),
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
  ];

  // Inizio e fine della settimana corrente
  const startOfWeek = today.clone().startOf("isoWeek");
  const endOfWeek = today.clone().endOf("isoWeek");

  // Controlla se oggi è un weekend
  const isWeekend = today.isoWeekday() === 6 || today.isoWeekday() === 7;

  // Calcola l'inizio e la fine della settimana successiva
  const nextWeekStart = isWeekend ? startOfWeek.clone().add(1, "weeks") : null;
  const nextWeekEnd = isWeekend ? endOfWeek.clone().add(1, "weeks") : null;

  return (
    <>
      <Scheduler
        view="week"
        events={events}
        locale={it}
        hourFormat="24"
        disableViewNavigator={true}
        customEditor={({ ...props }) => (
          console.log(props),
          (
            <AddEventDialog
              {...props}
              state={props.state}
              start={props.state.start.value}
              end={props.state.end.value}
              onConfirm={props.onConfirm}
              onClose={props.close}
            />
          )
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
            // setStartState(startMoment);
            const isCurrentWeek = startMoment.isBetween(
              startOfWeek,
              endOfWeek,
              null,
              "[]"
            );

            // Verifica se il giorno appartiene alla settimana successiva
            const isNextWeekEnabled =
              nextWeekStart &&
              startMoment.isBetween(nextWeekStart, nextWeekEnd, null, "[]");

            // Determina se il giorno è disabilitato
            const isDisabled =
              isBeforeToday || (!isCurrentWeek && !isNextWeekEnabled);

            //Logica per disabilitare gli eventi
            events.forEach((event) => {
              event.start = moment(event.start).toDate();
              if (startMoment.isBefore(event.start)) {
                event.disabled = true;
              }
            });

            return (
              // console.log(start),
              <Button
                style={{
                  height: "100%",
                  background: isDisabled ? "#eee" : "transparent",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (isDisabled) {
                    //Toast
                    return alert("Opss, giorno disabilitato");
                  }
                  onClick();
                }}
                {...props} // Mantieni tutte le props aggiuntive
              />
            );
          },
        }}
      />
    </>
  );
}

export default App;
