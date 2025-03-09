import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MembersProvider } from './context/GlobalMembersContext.tsx'
import { NotesProvider } from './context/GlobalNotesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotesProvider>
      <MembersProvider>
        <App />
      </MembersProvider>
    </NotesProvider>
  </StrictMode>,
)
