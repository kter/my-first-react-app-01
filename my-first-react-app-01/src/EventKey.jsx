export default function EventKey() {
  const handleKey = e => {
    if (e.ctrlKey && e.key === 'q') {
      alert('name must be under 20');
    }
  };

  return (
    <form>
      <label>
        name: <input type="text" size="20" onKeyDown={handleKey} />
      </label>
    </form>
  );
}
