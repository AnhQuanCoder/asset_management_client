import { App, ConfigProvider } from 'antd';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router"
import { Provider } from 'react-redux'
import enUS from 'antd/locale/en_US';

import { store } from 'redux/store';
import routes from "routes/index";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <ConfigProvider locale={enUS}>

          <RouterProvider router={routes} />
        </ConfigProvider>
      </App>
    </Provider>
  </StrictMode>,
)
