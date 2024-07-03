# A Simple Users Table with React

## Overview

This project is a React application built with TypeScript and Vite. It leverages Redux for state management and integrates with local storage and REST APIs using custom hooks and Axios.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Redux**: A predictable state container for JavaScript apps.
- **Redux Persist**: A library to persist and rehydrate a Redux store.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Local Storage**: Web storage that allows JavaScript sites and apps to store and access data right in the browser.

## Project Structure

### Entry Point

The entry point of the application is defined in `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Main Application

The main application is bootstrapped in `src/main.tsx`:

```js
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
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
```
### State Management

Redux is used for state management. The store configuration and slices are defined in the **redux** directory. For example, the **usersSlice**:

```js
//Selectors
export const selectAllUsers = (state: RootState) => state.users

export const { addUser, fillUser, updateUser } = usersSlice.actions
const usersReducer: Reducer<usersState> = usersSlice.reducer

export default usersReducer
export type UsersSlice = typeof usersSlice
```

### API Integration

Axios is used for making HTTP requests. An Axios instance is configured in src/`components/utils/axiosInstance.ts`:

```js
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})
export default axiosInstance
```

### Custom Hooks

A custom hook **useLocalStorage** is used for interacting with local storage:

```js
import { useState } from 'react'

const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(
                'Error reading localStorage key “' + key + '”: ',
                error
            )
            return initialValue
        }
    })

    const setValue = (value: any) => {
        try {
            setStoredValue(value)
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(
                'Error setting localStorage key “' + key + '”: ',
                error
            )
        }
    }
    return [storedValue, setValue]
}

export default useLocalStorage
```

# Getting Started

### Prerequisites

*   Node.js
*   npm or yarn

### Installation

1.  Clone the repository:
    
        git clone https://github.com/your-repo/project-name.git
        
2.  Navigate to the project directory:
    
        cd project-name
        
3.  Install dependencies:
    
        npm install
        
    or
    
        yarn install

### Running the Application

To start the development server, run:

    npm run dev
    
or

    yarn dev

### Building for Production

To create a production build, run:

    npm run build
    
or

    yarn build

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

