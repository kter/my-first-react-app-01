import { type ChangeEvent, type MouseEvent, useState } from 'react';

...

export default function StateTodo() {
  ...
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => { ... };
  const handleDone = (e: MouseEvent<HTMLButtonElement>) => { ... };
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => { ... };
  ...
}
