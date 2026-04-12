import { useState } from 'react';

export default function FormCheckMulti() {
  const [form, setForm] = useState({
    animal: ['dog', 'hamster']
  });

  const handleFormMulti = e => {
    const fa = [...form.animal];
    if (e.target.checked) {
      fa.push(e.target.value);
    } else {
      fa.splice(fa.indexOf(e.target.value), 1);
    }

    setForm({
      ...form,
      [e.target.name]: fa
    });
  };

  const show = () => {
    console.log(`Animal: ${form.animal}`);
  };

  return (
    <form>
      <fieldset>
        <legend>Animals:</legend>
        <label htmlFor="animal_dog">Dog</label>
        <input id="animal_dog" name="animal" type="checkbox" value="dog" checked={form.animal.includes('dog')} onChange={handleFormMulti} /><br />
        <label htmlFor="animal_ham">hamster</label>
        <input id="animal_ham" name="animal" type="checkbox" value="hamster" checked={form.animal.includes('hamster')} onChange={handleFormMulti} /><br />
      </fieldset>
      <button type="button" onClick={show}>Submit</button>
    </form>
  );
}

