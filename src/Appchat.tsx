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
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 0,
          endHour: 24,
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 0,
          endHour: 24,
          step: 60,
          cellRenderer: ({ height, start, onClick, ...props }) => {
            const now = new Date();
            const today = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() + 1
            );

            // Inizio e fine della settimana corrente
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Lunedì
            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (8 - today.getDay())); // Domenica

            // Inizio e fine della settimana successiva
            const startOfNextWeek = new Date(endOfWeek);
            startOfNextWeek.setDate(endOfWeek.getDate()); // Lunedì della settimana successiva
            const endOfNextWeek = new Date(startOfNextWeek);
            endOfNextWeek.setDate(startOfNextWeek.getDate() + 7); // Domenica della settimana successiva

            // Inizio e fine della settimana dopo la successiva
            const startOfTwoWeeks = new Date(endOfNextWeek);
            startOfTwoWeeks.setDate(endOfNextWeek.getDate() + 1); // Lunedì della settimana dopo
            const endOfTwoWeeks = new Date(startOfTwoWeeks);
            endOfTwoWeeks.setDate(startOfTwoWeeks.getDate() + 6); // Domenica della settimana dopo

            // Sbloccare i giorni della settimana successiva solo se oggi è sabato o domenica
            const isSaturday = today.getDay() === 6; // Sabato
            const isInCurrentWeek = start >= startOfWeek && start < endOfWeek;
            const isPast = start < now;

            const isNextWeek =
              start >= startOfNextWeek && start <= endOfNextWeek && isSaturday;

            // Disabilita il lunedì della settimana dopo
            const isMondayOfTwoWeeks =
              start.getDay() === 0 &&
              start >= startOfTwoWeeks &&
              start < endOfTwoWeeks;

            // Disabilita i giorni non della settimana corrente, già passati o della settimana successiva
            const disabled =
              (!isInCurrentWeek && !isNextWeek) || isPast || isMondayOfTwoWeeks; // Lunedì della settimana dopo

            const restProps = disabled ? {} : props;

            return (
              <Button
                style={{
                  height: "100%",
                  background: isPast
                    ? "#ffcccc"
                    : disabled
                    ? "#eee"
                    : "transparent", // Rosso pallido per giorni passati
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
            );
          },
        }}
        navigation={true}
      />
    </>
  );
}

export default App;
