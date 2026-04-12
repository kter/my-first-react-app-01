import { useRef } from 'react';

export default function StateFormUC() {
  const name = useRef(null);
  const age = useRef(null);

  const show = () => {
    console.log(`Hello, ${name.current.value} (${age.current.value})`);
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" name="name" type="text" ref={name} defaultValue="Sato" />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" name="age" type="number" ref={age} defaultValue="18" />
      </div>
      <div>
        <button type="button" onClick={show}>
          Submit
        </button>
      </div>
    </form>
  );
}
