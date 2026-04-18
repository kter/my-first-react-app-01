import { createRoot } from 'react-dom/client'
import HookMemo from './HookMemo';

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <HookMemo />
  </>
);

