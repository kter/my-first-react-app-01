import { useState } from 'react';

export default function FormCheck() {
  const [form, setForm] = useState({
    agreement: true
  });

  const handleFormCheck = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked
    });
  };

  const show = () => {
    console.log(`Agreement: ${form.agreement ? 'Agree' : 'Disagree'}`);
  }

  return (
    <form>
      <label htmlFor="agreement">Agreement: </label>
      <input id="agreement" name="agreement" type="checkbox" checked={form.agreement} onChange={handleFormCheck} /><br />
      <button type="button" onClick={show}>Submit</button>
    </form>
  );
}

