// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
  </>
);

