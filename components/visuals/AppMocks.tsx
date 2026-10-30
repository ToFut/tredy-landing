function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "FX";
}

export function IMessageThread({
  name,
  messages,
}: {
  name: string;
  messages: { side: "in" | "out"; text: string }[];
}) {
  return (
    <div className="imsg" aria-label={`Text message with ${name}`}>
      <header className="imsg-head">
        <span className="imsg-back" aria-hidden="true">
          <svg viewBox="0 0 12 20">
            <path d="M10 2L2 10l8 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="imsg-avatar" aria-hidden="true">
          {initials(name)}
        </span>
        <div className="imsg-who">
          <strong>{name}</strong>
          <small>mobile</small>
        </div>
        <span className="imsg-facetime" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 5.5h2.1c.4 0 .8.3.9.7l.4 1.7a1 1 0 0 1-.5 1.1l-1.2.5a8.5 8.5 0 0 0 4.1 4.1l.5-1.2a1 1 0 0 1 1.1-.5l1.7.4c.4.1.7.5.7.9V16a1.8 1.8 0 0 1-1.9 1.8A11.2 11.2 0 0 1 6.2 7.4 1.8 1.8 0 0 1 8 5.5z" fill="currentColor" />
          </svg>
        </span>
      </header>
      <div className="imsg-body">
        <p className="imsg-when">Today 9:14 AM</p>
        {messages.map((message) => (
          <p key={message.text} className={message.side === "out" ? "imsg-bubble out" : "imsg-bubble in"}>
            {message.text}
          </p>
        ))}
        <p className="imsg-delivered">Delivered</p>
      </div>
      <div className="imsg-bar">
        <span aria-hidden="true">+</span>
        <input aria-label="iMessage" placeholder="iMessage" readOnly tabIndex={-1} />
        <span className="imsg-mic" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3z" fill="currentColor" />
            <path d="M7 11a5 5 0 0 0 10 0M12 16v3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function CalendarDay({
  month = "October 2026",
  weekday = "Thursday",
  date = "30",
  title = "New patient consult",
  time = "10:00 to 11:00",
  place = "Oak Dental",
}: {
  month?: string;
  weekday?: string;
  date?: string;
  title?: string;
  time?: string;
  place?: string;
}) {
  const hours = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"];
  return (
    <div className="acal" aria-label={`Calendar, ${title} on ${weekday} at ${time}`}>
      <header className="acal-head">
        <p>{month}</p>
        <div>
          <span>{weekday}</span>
          <strong>{date}</strong>
        </div>
      </header>
      <div className="acal-day">
        {hours.map((hour) => (
          <div key={hour} className="acal-row">
            <span>{hour}</span>
            <i />
          </div>
        ))}
        <article className="acal-event">
          <strong>{title}</strong>
          <span>
            {time}
            <br />
            {place}
          </span>
        </article>
      </div>
    </div>
  );
}

export function BookingWidget() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  return (
    <div className="booker" aria-label="Booking calendar with Thursday the 30th at 10:00 selected">
      <header>
        <p>Book a visit</p>
        <strong>October 2026</strong>
      </header>
      <div className="booker-week" aria-hidden="true">
        {days.map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="booker-dates" aria-hidden="true">
        <span />
        <span />
        <span />
        {dates.map((date) => (
          <span key={date} className={date === 30 ? "is-on" : undefined}>
            {date}
          </span>
        ))}
      </div>
      <p className="booker-label">Thursday, October 30</p>
      <div className="booker-times">
        <span>9:00</span>
        <span className="is-on">10:00</span>
        <span>2:00</span>
      </div>
      <p className="booker-confirm">Confirm Thursday at 10:00</p>
    </div>
  );
}

export function NotesPlan({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <div className="notes" aria-label={`Notes, ${title}`}>
      <header>
        <span>Folders</span>
        <strong>Notes</strong>
        <span>Done</span>
      </header>
      <div className="notes-sheet">
        <p>{title}</p>
        <ul>
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
