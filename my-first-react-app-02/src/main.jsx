import { createRoot } from 'react-dom/client'
import HookMemo from './HookMemo';
import HookTransition from './HookTransition'

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <HookMemo />
    <HookTransition />
  </>
);

