export default function EventBasic({ type }) {
  // click Event Handler
  const current = () => {
    const d = new Date();
    switch (type) {
      case 'date':
        console.log(d.toLocaleDateString());
        break;
      case 'time':
        console.log(d.toLocaleTimeString());
        break;
      default:
        console.log(d.toLocaleString());
        break;
    }
  };

  return (
    <div>
      <button onClick={current}>get current time</button>
    </div>
  );
}
