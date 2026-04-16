import {  useState } from 'react';

export default function HookCallbackRef() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const callbackRef = elem => elem?.focus();

  return (
    <>
    <div>
    <label htmlFor="name">Name:</label>
      <input id="name" type="text" />
    </div>
    <div>
    <label htmlFor="email">Email:</label>
    <input id="email" type="text" />
    <button onClick={handleClick}>Expansion</button>
    </div>
    {show &&
      <div>
      <label htmlFor="address">Address: </label>
      <input id="address" type="text" ref={callbackRef} />
      </div>
    }
    </>
  );
}
