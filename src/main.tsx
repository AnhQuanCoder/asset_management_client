import { App } from 'antd';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router"
import { Provider } from 'react-redux'

import { store } from 'redux/store';
import routes from "routes/index";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={routes} />
      </App>
    </Provider>
  </StrictMode>,
)
