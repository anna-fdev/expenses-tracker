import * as ReactDOM from 'react-dom/client';

import { App } from './app/app';
import { Layout } from './app/components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App>
    <Layout />
  </App>
);
