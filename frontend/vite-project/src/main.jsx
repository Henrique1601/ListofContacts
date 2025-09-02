import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'

render(
<div>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</div>,
document.getElementById('app')
)
