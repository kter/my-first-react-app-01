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
import TitledPanel2 from './TitledPanel2'
import ListTemplate from './ListTemplate'
import ListTemplate2 from './ListTemplate2'
import StateParent from './StateParent'
import EventMouse from './EventMouse'
import EventObj from './EventObj'

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
  </>
);

