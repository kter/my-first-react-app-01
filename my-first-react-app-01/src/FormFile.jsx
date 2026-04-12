import { useRef } from 'react';

export default function FormFile() {
  const file = useRef(null);

  function show() {
    const fs = file.current.files;
    for (const f of fs) {
      console.log(`filename: ${f.name}`);
      console.log(`type: ${f.type}`);
      console.log(`size: ${Math.trunc(f.size / 1024)}KB`);
    }
  }

  return (
    <form>
      <input type="file" ref={file} multiple />
      <button type="button" onClick={show}>Submit</button>
    </form>
  );
}
