import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store/';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Main() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
const rootEl = document.getElementById('root');
ReactDOM.render(<Main/>, rootEl);
reportWebVitals();
