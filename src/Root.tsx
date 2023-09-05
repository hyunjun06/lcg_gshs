import App from './App';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { defaultTheme } from './Themes';

function Root() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <App />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default Root;