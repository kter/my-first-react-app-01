import { useState } from 'react';

export default function StateForm() {
  const [form, setForm] = useState({
    name: 'Yamada',
    age: 18
  });

  const handleForm = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const show = () => {
    console.log(`Hello, ${form.name} (${form.age} `);
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" onChange={handleForm} value={form.name} />
      </div>
      <div>
        <label htmlFor="age">Age: </label>
        <input id="age" name="age" type="number" onChange={handleForm} value={form.age} />
      </div>
      <div>
        <button type="button" onClick={show}>Submit</button>
        <p> Hello, {form.name} ({form.age})</p>
      </div>
    </form>
  );
}

