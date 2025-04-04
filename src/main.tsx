import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { WelcomePage, MatchViewPage, DashboardPage } from './pages'
import { Provider } from 'react-redux'
import { store } from './store'
import { SocketProvider } from './context/SocketContext'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/match/:id" element={<MatchViewPage />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
