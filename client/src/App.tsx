import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { router } from '@/router'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/providers/AuthProvider'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster theme="dark" position="bottom-right" />
      </AuthProvider>
    </Provider>
  )
}

export default App
