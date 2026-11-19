import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx'
import { MessageProvider } from './context/MessageContext.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
     <BrowserRouter>
      <MessageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
       </MessageProvider>
     </BrowserRouter>
   </StrictMode>,
 );