export function formatDate(date) {
  if (date) return `${date.getMonth() + 1}-${date.getDate()}`;
}

export function handleOffDays(offDays, setOffDays, date, clickType) {
  const formattedDate = formatDate(date);

  if (offDays[formattedDate]) {
    const newOffDays = { ...offDays };
    delete newOffDays[formattedDate];
    setOffDays(newOffDays);
  } else {
    const xOrPlus = clickType === "x" ? "x" : "+";
    if (date) setOffDays({ ...offDays, [formattedDate]: xOrPlus });
  }
}

export function tileGenerator(offDays, setOffDays, date, i) {
  let tile = "tile";
  const key = date ? `${date.getMonth()}-${date.getDate()}` : i;
  let newDiv = "";
  if (offDays[formatDate(date)] === "x") {
    newDiv = <div className="xTile"></div>;
  } else if (offDays[formatDate(date)] === "+") {
    newDiv = <div className="plusTile"></div>;
  } else if (key === i) {
    tile = "noTile";
  }
  return (
    <div
      onClick={leftClickHandler(offDays, setOffDays, date)}
      onContextMenu={rightClickHandler(offDays, setOffDays, date)}
      className={tile}
      key={key}
    >
      <div className="tileDay">{date?.getDate()}</div>
      {newDiv}
    </div>
  );
}

function leftClickHandler(offDays, setOffDays, date) {
  return () => {
    handleOffDays(offDays, setOffDays, date, "x");
  };
}

function rightClickHandler(offDays, setOffDays, date) {
  return () => {
    handleOffDays(offDays, setOffDays, date, "+");
    return false;
  };
}
