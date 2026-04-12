import { useState } from 'react';

export default function FormList() {
  const [form, setForm] = useState({
    animal: ['dog', 'cat']
  });

  const handleFormList = e => {
    const data = [];
    const opts = e.target.options;
    for (const opt of opts) {
      if (opt.selected) {
        data.push(opt.value);
      }
    }
    setForm({
      ...form,
      [e.target.name]: data
    });
  };
  const show = () => {
    console.log(`Animal: ${form.animal}`);
  };

  return (
      <form>
      <label htmlFor="animal">Animal: </label><br />
      <select id="animal" name="animal" value={form.animal} size="4" multiple={true} onChange={handleFormList}>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="rabbit">Rabbit</option>
      </select>
      <button type="button" onClick={show}>Submit</button>
      </form >
    );
}
