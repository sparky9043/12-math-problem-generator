import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import CurrentUserContextProvder from './contexts/CurrentUser.tsx'
import ProblemsContextProvider from './contexts/ProblemsContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ProblemsContextProvider>
          <CurrentUserContextProvder>
            <App />
          </CurrentUserContextProvder>
        </ProblemsContextProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
)
