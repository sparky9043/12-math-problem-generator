import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
// import CurrentUserContext from './contexts/CurrentUser.ts'
import ProblemsContextProvider from './contexts/ProblemsContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ProblemsContextProvider>
          <App />
        </ProblemsContextProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
)
