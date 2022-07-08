export default function CalendarHeader({ dpInfo, handleSubmit }) {
  return (
    <div id="calendarHeaderContainer">
      <button className="submitButton" onClick={handleSubmit}>
        SUBMIT
      </button>
      <h1 id="dpLabel">
        DP {dpInfo?.dpNumber} - {dpInfo?.dpYear}
      </h1>
      <div id="numberOfDaysOff">Days Off: {dpInfo.numberOfDaysOff12}</div>
    </div>
  );
}
