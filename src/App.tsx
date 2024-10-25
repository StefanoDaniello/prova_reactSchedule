import { Scheduler } from "@aldabil/react-scheduler";
import { it } from "date-fns/locale";

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
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6], // Order of days starting from Monday
          weekStartOn: 1, // Start the week on Monday
          startHour: 0, // Start hour for the scheduler
          endHour: 24, // End hour for the scheduler
        }}
        navigation={true}
      />
    </>
  );
}

export default App;
