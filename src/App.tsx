import { Scheduler } from "@aldabil/react-scheduler";
import { it } from "date-fns/locale";
import { Button } from "@mui/material";

function App() {
  const events: any[] = [
    {
      event_id: 1,
      title: "Event 1",
      start: new Date("2024/10/25 09:30"),
      end: new Date("2024/10/25 10:30"),
    },
    {
      event_id: 2,
      title: "Event 2",
      start: new Date("2024/10/25 10:00"),
      end: new Date("2024/10/25 11:00"),
    },
  ];

  function getFirstDayOfWeek(date: Date) {
    const firstDay = new Date(date);
    const dayOfWeek = firstDay.getDay(); // 0 = domenica, 1 = lunedì, ..., 6 = sabato
    firstDay.setHours(0, 0, 0, 0);
    const diff = (dayOfWeek + 6) % 7; // Calcola la differenza per arrivare al lunedì
    firstDay.setDate(firstDay.getDate() - diff); // Sottrae la differenza dal giorno corrente
    return firstDay;
  }

  function getLastDayOfWeek(date: Date) {
    const lastDay = new Date(date);
    const dayOfWeek = lastDay.getDay(); // 0 = domenica, 1 = lunedì, ..., 6 = sabato
    lastDay.setHours(23, 59, 59, 999);
    const diff = (dayOfWeek + 0) % 7; // Calcola la differenza per arrivare alla domenica
    lastDay.setDate(lastDay.getDate() + (7 - diff)); // Aggiunge la differenza fino alla domenica
    return lastDay;
  }

  return (
    <>
      <Scheduler
        view="week"
        events={events}
        locale={it}
        hourFormat="24"
        navigation={true}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 0,
          endHour: 24,
          step: 60,
          cellRenderer: ({ height, start, onClick, ...props }) => {
            const today = new Date();
            today.setDate(today.getDate() + 2);

            // Inizio e fine della settimana corrente
            const firstDayOfWeek = getFirstDayOfWeek(today);
            const lastDayOfWeek = getLastDayOfWeek(today);

            const disabled =
              start < today || start >= lastDayOfWeek || start < firstDayOfWeek;

            const restProps = disabled ? {} : props;

            return (
              console.log(today, firstDayOfWeek, lastDayOfWeek),
              (
                <Button
                  style={{
                    height: "100%",
                    background: disabled ? "#eee" : "transparent",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (disabled) {
                      return alert("Opss, giorno disabilitato");
                    }
                    onClick();
                  }}
                  disableRipple={disabled}
                  {...restProps}
                ></Button>
              )
            );
          },
        }}
      />
    </>
  );
}

export default App;
