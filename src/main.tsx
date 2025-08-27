import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const LayoutDefault = React.lazy(() => import("layouts/layout-default"));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LayoutDefault />
  </StrictMode>,
)
