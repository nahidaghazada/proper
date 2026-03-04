import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import router from './router/Router.jsx'
import { RouterProvider } from 'react-router'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <Toaster position="top-right" />
    <RouterProvider router={router} />
  </Provider>
)
