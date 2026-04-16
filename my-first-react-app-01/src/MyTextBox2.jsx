import { useImperativeHandle, useRef } from 'react';

export default function MyTextBox2({ label, ref }) {
  const input = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        input.current.focus();
      }
    }
  }, []);

  return (
    <label>
    {label}:
    <input type="text" size="15" ref={input} />
    </label>
  );
}
