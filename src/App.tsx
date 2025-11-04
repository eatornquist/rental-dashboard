import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import ThemeProviderWrapper, { ThemeContext } from './theme/ThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeContext.Provider value={() => {}}>
      <ThemeProviderWrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Provider store={store}>{content}</Provider>
        </LocalizationProvider>
      </ThemeProviderWrapper>
    </ThemeContext.Provider>
  );
}
export default App;
