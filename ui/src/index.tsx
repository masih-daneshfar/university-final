import React from 'react';
import ReactDOM from 'react-dom';
import '@picocss/pico';
import '@assets/css/global.css';
import App from './App';



ReactDOM.render(<React.StrictMode>
  <App />
</React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

