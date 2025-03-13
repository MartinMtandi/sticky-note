import { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import NotesPage from "./pages/NotesPage";
import {defaultTheme as theme} from './utils/theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <NotesPage />
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  background-image: ${({theme}) => theme.colors.linearGradiant};
  background-size: ${({theme}) => theme.sizes.backgroundSize};
  height: 100vh;
  position: relative;
  overflow: auto;
`;

export default App;
