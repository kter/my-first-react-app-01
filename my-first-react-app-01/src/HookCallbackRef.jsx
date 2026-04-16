import { useEffect, useRef, useState } from 'react';

export default function HookCallbackRef() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const address = useRef(null);

  useEffect(() => {
    if (address.current) {
      address.current.focus();
    }
  }, [show]);

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
      <input id="address" type="text" ref={address} />
      </div>
    }
    </>
  );
}
