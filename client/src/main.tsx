import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesProvider from './hoc/RoutesProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoutesProvider/>
  </React.StrictMode>,
)
