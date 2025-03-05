import { FC } from 'react'
import styled from 'styled-components'
import NotesPage from './pages/NotesPage'

const App: FC = () => {
  return (
    <AppContainer>
      <NotesPage />
    </AppContainer>
  )
}

const AppContainer = styled.div`
  background-color: #212228;
  background-image: linear-gradient(#292a30 0.1em, transparent 0.1em),
    linear-gradient(90deg, #292a30 0.1em, transparent 0.1em);
  background-size: 4em 4em;
  height: 100vh;
  position: relative;
  overflow: auto;
`

export default App
