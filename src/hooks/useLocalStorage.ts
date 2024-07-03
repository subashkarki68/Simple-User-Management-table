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
