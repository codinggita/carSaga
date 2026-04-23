import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { router } from '@/router'
import { Toaster } from 'sonner'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster theme="dark" position="bottom-right" />
    </Provider>
  )
}

export default App
