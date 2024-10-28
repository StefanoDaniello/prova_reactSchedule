import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

const AddEventDialog = ({
  state,
  start,
  end,
  onClose,
  onConfirm,
  events,
  setEvents,
}: any) => {
  if (!open) return null;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    state.title.value = title;
    state.subtitle.value = subtitle;
    console.log(state);
  }, [title, subtitle]);

  const toItDate = (date: any) => {
    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleSubmit = () => {
    if (title.length < 3) {
      setError("il titolo deve essere minimo di 3 caratteri");
    } else {
      state.title.validity = true;
      setError("");
      onConfirm({ title, subtitle, start, end });
      setEvents([
        ...events,
        {
          event_id: Math.floor(Math.random() * 1000),
          title: title,
          editable: false,
          draggable: false,
          disabled: false,
          color: "#cae15a",
          textColor: "black",
          start: moment(start).toDate(),
          end: moment(end).toDate(),
        },
      ]);
      onClose();
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2 className="dialog-title">Add Event</h2>
        <div className="dialog-content">
          <div className="form-group">
            <label htmlFor="event-title">Title *</label>
            <input
              type="text"
              id="event-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="event-subtitle">Subtitle</label>
            <input
              type="text"
              id="event-subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <div className="form-group date-time">
            <div>
              <label htmlFor="event-start">Start</label>
              <input
                readOnly
                value={toItDate(start)}
                type="text"
                id="event-start"
                placeholder="DD/MM/YYYY hh:mm"
              />
            </div>
            <div>
              <label htmlFor="event-end">End</label>
              <input
                readOnly
                value={toItDate(end)}
                type="text"
                id="event-end"
                placeholder="DD/MM/YYYY hh:mm"
              />
            </div>
          </div>
          {/* Aggiungi altri campi del modulo se necessario */}
        </div>
        <div className="dialog-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="add-button" onClick={handleSubmit}>
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventDialog;
