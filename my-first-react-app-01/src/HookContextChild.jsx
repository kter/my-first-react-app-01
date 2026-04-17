import { use } from 'react';
import MyAppContext from './MyAppContext';

export function HookContextChild() {
  return (
    <div id="c_child">
    <HookContextChildGrand />
    </div>
  );
}

export function HookContextChildGrand() {
  const { title, lang } = use(MyAppContext);
  return (
    <div id = "c_child_grand">
    {title} ({lang})
    </div>
  );
}

