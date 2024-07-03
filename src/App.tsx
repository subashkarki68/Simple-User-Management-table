import UserTable from './components/UserTable/UserTable'
import useLocalStorage from './hooks/useLocalStorage'

const App = () => {
    const [userData, setUserData] = useLocalStorage('userData', {
        name: 'John',
        age: 30,
    })
    return <UserTable />
}

export default App
