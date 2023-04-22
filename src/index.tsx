import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ColorPalette from './components/color_palette'
import "./index.css"

const JSXRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<ColorPalette />}> </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={JSXRouter} />
);