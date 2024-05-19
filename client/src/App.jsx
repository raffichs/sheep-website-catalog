import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import AdminPage from './pages/AdminPage'
import AddPage from './pages/AddPage'

axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.withCredentials = true

function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/admin' element={<AdminPage />}/>
      <Route path='/add' element={<AddPage />}/>
    </Routes>
  )
}

export default App
