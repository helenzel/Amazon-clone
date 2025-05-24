import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import "./index.css"
import { DataProvider } from './components/DataProvider/DataProvider.jsx'
import {initialState,Reducer} from './Utilty/Reducer.js'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider Reducer={Reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
);
