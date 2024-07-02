import { useState } from 'react'

const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
    })

    const setValue = (value: any) => {
        setStoredValue(value)
        localStorage.setItem(key, JSON.stringify(value))
    }
}
