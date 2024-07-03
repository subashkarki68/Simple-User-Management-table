import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import './index.css'
import { persistor, store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
                <App />
                {/* </ThemeProvider> */}
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
