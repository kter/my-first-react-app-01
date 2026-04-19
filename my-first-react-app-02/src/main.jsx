import { createRoot } from 'react-dom/client';
import HookMemo from './HookMemo';
import HookTransition from './HookTransition';
import HookDeferred from './HookDeferred';
import HookDeferredTransition from './HookDeferredTransition';
import ActionPre from './ActionPre';

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <HookMemo />
    <HookTransition />
    <HookDeferred />
    <HookDeferredTransition />
    <ActionPre />
  </>
);

