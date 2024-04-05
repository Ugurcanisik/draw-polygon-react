import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <ModalsProvider>
      <Notifications />
      <App />
    </ModalsProvider>
  </MantineProvider>
);
