import { useState } from 'react';

export default function FormRadio() {
  const [form, setForm] = useState({
    os: 'windows'
  });

  const handleForm = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const show = () => {
    console.log(`OS: ${form.os}`);
  };

  return (
    <form>
      <fieldset>
        <legend>OS: </legend>
        <label htmlFor="os_win">Windows</label>
        <input id="os_win" name="os" type="radio" value="windows" checked={form.os === 'windows'} onChange={handleForm} /><br />

        <label htmlFor="os_mac">Mac</label>
        <input id="os_mac" name="os" type="radio" value="mac" checked={form.os === 'mac'} onChange={handleForm} /><br />
      </fieldset>
      <button type="button" onClick={show}>Submit</button>
    </form>
  );
}

