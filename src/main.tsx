import { App } from 'antd';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router"

import routes from "routes/index";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <RouterProvider router={routes} />
    </App>
  </StrictMode>,
)
