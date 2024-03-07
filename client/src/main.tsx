import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesProvider from './hoc/RoutesProvider.tsx'
import './input.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RoutesProvider/>
)
