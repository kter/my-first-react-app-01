// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import './index.css'
// import App from './App.jsx'
import MyHello from './MyHello';
import EventBasic from './EventBasic';
import StateBasic from './StateBasic';
import books from './books'
import ForList from './ForList';
import ForNest from './ForNest';
import ForFilter from './ForFilter';
import ForSort from './ForSort';
import SelectComp from './SelectComp'
import SelectStyle from './SelectStyle'
import StyledPanel from './StyledPanel'
import TitledPanel from './TitledPanel'
import TitledPanel2 from './TitledPanel2'
import ListTemplate from './ListTemplate'
import ListTemplate2 from './ListTemplate2'
import StateParent from './StateParent'
import EventMouse from './EventMouse'
import EventObj from './EventObj'
import EventKey from './EventKey'
import EventArgs from './EventArgs'
import EventArgs2 from './EventArgs2'
import StateForm from './StateForm'
import StateFormUC from './StateFormUC'
import FormTextarea from './FormTextarea'
import FormSelect from './FormSelect'
import FormList from './FormList'
import FormRadio from './FormRadio'
import FormCheck from './FormCheck'
import FormCheckMulti from './FormCheckMulti'
import FormFile from './FormFile'
import StateNest from './StateNest'
import StateTodo from './StateTodo'
import FormBasic from './FormBasic'
import LazyBasic from './LazyBasic'
import LazyMulti from './LazyMulti'
import SuspenseSimple from './SuspenseSimple'
import SuspenseResult from './SuspenseResult'
import ModuleBasic from './ModuleBasic'
import ModuleNest from './ModuleNest'
import EmotionBasic from './EmotionBasic'
import MotionBasic from './MotionBasic'
import MotionWhile from './MotionWhile'
import MotionExit from './MotionExit'
import MotionVariant from './MotionVariant'
import MotionNest from './MotionNest'
import PortalBasic from './PortalBasic'
import ErrorRoot from './ErrorRoot'
import ErrorRetryRoot from './ErrorRetryRoot'
import ErrorEventRoot from './ErrorEventRoot'
import MetaBasic from './MetaBasic'
import ScriptBasic from './ScriptBasic'
import StyleBasic from './StyleBasic'
import MaterialBasic from './MaterialBasic'
import MaterialDrawer from './MaterialDrawer'
import MaterialGrid from './MaterialGrid'
import MaterialGrid2 from './MaterialGrid2'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme'
import MaterialMode from './MaterialMode';
import FormMui from './FormMui';
import SWRPre from './SWRPre';
import SWRBasic from './SWRBasic';
import SWRApp from './SWRApp';
import SWRApp2 from './SWRApp2';
import StateEffect from './StateEffect';
import HookTimer from './HookTimer';
import HookEffect from './HookEffect';
import HookRefNg from './HookRefNg';
import HookRef from './HookRef';
import HookRefForward from './HookRefForward';
import MyTextBox2 from './MyTextBox2';
import HookCallbackRef from './HookCallbackRef';
import HookCallbackRef2 from './HookCallbackRef2';
import HookReducer from './HookReducer';
import HookReducerUp from './HookReducerUp';
import HookContext from './HookContext';
import MyThemeProvider from './MyThemeProvider';
import HookThemeButton from './HookThemeButton';
import UsePromise from './UsePromise';
import JotaiCounter from './JotaiCounter';
import JotaiTodo from './JotaiTodo';

const root = createRoot(document.getElementById('root'));
// root.render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>,
// );

// setInterval(() => {
//   root.render(
//     <p>current time: {(new Date()).toLocaleString()}</p>
//   );
// }, 1000);

const title = 'TiledPanel Title';
const body = 'TiledPanel Body';

function fetchInfo() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Result promise'), 5000);
  });
}

root.render(
  <>
    <MyHello myName="Takahashi" />
    <EventBasic type="time" />
    <StateBasic init={0} />
    <ForList src={books} />
    <ForNest src={books} />
    <ForFilter src={books} />
    <ForSort src={books} />
    <SelectComp />
    <SelectStyle mode="light" />
    <StyledPanel>
      <p>StyledPanel Test!</p>
    </StyledPanel>
    <TitledPanel title={title} body={body} />
    <TitledPanel2>
      <p key="title">This is TitledPanel2 title</p>
      <p key="body">This is TitledPanel2 body</p>
    </TitledPanel2>
    <ListTemplate src={books}>
      {elem => (
        <>
          <dt>
            {elem.title} ({elem.price}円)
          </dt>
          <dd>{elem.summary}</dd>
        </>
      )}
    </ListTemplate>
    <ListTemplate2 src={books} render={elem => (
      <>
        <dt>
          {elem.title} ({elem.price}円)
        </dt>
        <dd>{elem.summary}</dd>
      </>
    )} />
    <StateParent />
    <EventMouse defaultSrc="https://www.web-deli.com/image/linkbanner_l.gif"
      afterSrc="https://www.web-deli.com/image/home_chara.gif" />
    <EventObj />
    <EventKey />
    <EventArgs />
    <EventArgs2 />
    <StateForm />
    <StateFormUC />
    <FormTextarea />
    <FormSelect />
    <FormList />
    <FormRadio />
    <FormCheck />
    <FormCheckMulti />
    <FormFile />
    <StateNest />
    <StateTodo />
    <FormBasic />
    <LazyBasic />
    <LazyMulti />
    <SuspenseSimple />
    <SuspenseResult />
    <ModuleBasic />
    <ModuleNest />
    <EmotionBasic />
    <MotionBasic />
    <MotionWhile />
    <MotionExit />
    <MotionVariant />
    <MotionNest />
    <div id="dialog"></div>
    <PortalBasic />
    <ErrorRoot />
    <ErrorRetryRoot />
    <ErrorEventRoot />
    <MetaBasic />
    <ScriptBasic />
    <StyleBasic />
    <MaterialBasic />
    <MaterialDrawer />
    <MaterialGrid />
    <MaterialGrid2 />
    <ThemeProvider theme={theme}>
      // ブラウザー規定のスタイルシートを正規化し、環境による見た目のさいを吸収（normalize.cssと同じ)
      <CssBaseline />
      <MaterialBasic />
    </ThemeProvider>
    MaterialMode
    <MaterialMode />
    <FormMui />
    <SWRPre />
    <SWRBasic />
    <SWRApp />
    <SWRApp2 />
    <StateEffect init={0} />
    <HookTimer init={10} />
  HookEffect
    <HookEffect init={10} />
    <HookRefNg />
    <HookRef />
    <HookRefForward />
    <MyTextBox2 />
    <HookCallbackRef />
    <HookCallbackRef2 />
    <HookReducer init={0} />
    <HookContext />
    <MyThemeProvider>
      <HookThemeButton />
    </MyThemeProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <UsePromise service={fetchInfo()} />
    </Suspense>
    <JotaiCounter />
    <JotaiTodo />
  </>
);

