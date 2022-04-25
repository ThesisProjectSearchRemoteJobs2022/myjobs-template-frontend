import React from 'react'
import ReactDOM from 'react-dom'
import './static/css/index.css'
import App from './App'
// import { AuthProvider } from '../src/pages/context/AuthProvider';
import { StateProvider } from './reducer/StateProvider';
import reducer, {inicialState} from './reducer/reducer';
ReactDOM.render(
  // <React.StrictMode>
  //   <AuthProvider>
  //     <App />
  //   </AuthProvider>
  // </React.StrictMode>,

<StateProvider inicialState={inicialState} reducer ={reducer}> 
  <App />
</StateProvider>,

  document.getElementById('root')
)

