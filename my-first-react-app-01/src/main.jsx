// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import MyHello from './MyHello';
import EventBasic from './EventBasic';

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

root.render(
  <>
    <MyHello myName="Takahashi" />
    <EventBasic type="time" />
  </>
);

