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

  return (
    <>
      <Scheduler
        view="week"
        events={events}
        locale={it}
        hourFormat="24"
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6], // Mostra tutti i giorni della settimana, ma abilitati solo quelli della settimana corrente
          weekStartOn: 1, // Inizio della settimana di lunedì
          startHour: 0, // Ora di inizio per il planner
          endHour: 24, // Ora di fine per il planner
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 0,
          endHour: 24,
          step: 60,
          cellRenderer: ({ height, start, onClick, ...props }) => {
            // Ottieni la data e l'ora correnti
            const now = new Date();

            // Crea una nuova data senza ore, minuti, secondi e millisecondi
            const currentTime = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate(),
              now.getHours() - 1,
              now.getMinutes()
            );

            // Controlla se l'orario dell'evento è passato
            const disabled = start.getTime() < currentTime.getTime(); // start è in millisecondi

            const restProps = disabled ? {} : props;

            return (
              console.log({ start, currentTime }),
              (
                <Button
                  style={{
                    height: "100%",
                    background: disabled ? "#eee" : "transparent",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (disabled) {
                      return alert("Opss");
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
        navigation={true}
      />
    </>
  );
}

export default App;
