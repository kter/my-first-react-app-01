import { useRef } from 'react';

export default function StateFormUC() {
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const show = () => {
    console.log(`Hello, ${name.current?.value} (${age.current?.value})!`);
  };
  ...
}
