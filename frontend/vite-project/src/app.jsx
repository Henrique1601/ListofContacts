import { useState } from 'preact/hooks'
import { ErrorBoundary } from 'react-error-boundary'
// Nav
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// CSS
import './app.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BubbleBackgroundDemo } from './components/bubble-background'
export function App({ children }) {
/*   const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
 */
function ErrorFallback({ error }) {
  return(
      <div role='alert'>
        <p>Algo de errado</p>
        <pre>{error.message}</pre>
      </div>
  )
}
  return (
    <>
       {/* <BubbleBackgroundDemo></BubbleBackgroundDemo>  */}
      <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} /> {/* Adicione esta linha */}
      </Routes>

      </div>
    </>
  )
}
