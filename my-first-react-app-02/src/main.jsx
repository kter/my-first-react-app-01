import { createRoot } from 'react-dom/client';
import HookMemo from './HookMemo';
import HookTransition from './HookTransition';
import HookDeferred from './HookDeferred';
import HookDeferredTransition from './HookDeferredTransition';
import ActionPre from './ActionPre';
import ActionBasic from './ActionBasic';
import ActionOptimistic from './ActionOptimistic';
import HookCustom from './HookCustom';

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <HookMemo />
    <HookTransition />
    <HookDeferred />
    <HookDeferredTransition />
    <ActionPre />
    <ActionBasic />
    <ActionOptimistic />
    <HookCustom />
  </>
);

