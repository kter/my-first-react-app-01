export default function EventArgs() {
  const current = (e) => {
    const type = e.target.dataset.type;
    const d = new Date();
    switch (type) {
      case 'date':
        console.log(`${e.target.id}: ${d.toLocaleDateString()}`);
        break;
      case 'time':
        console.log(`${e.target.id}: ${d.toLocaleTimeString()}`);
        break;
      default:
        console.log(`${e.target.id}: ${d.toLocaleString()}`);
        break;
    }
  };

  return (
    <div>
      <button id="dt" data-type="datetime" onClick={e => current(e, 'datetime')}>current datetime</button>
      <button id="date" data-type="date" onClick={e => current(e, 'date')}>current date</button>
      <button id="time" data-type="time" onClick={e => current(e, 'time')}>current time</button>
    </div>
  );
}
