import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/user/IndexPage'
import LoginPage from './pages/admin/LoginPage'
import RegisterPage from './pages/admin/RegisterPage'
import axios from 'axios'
import AdminPage from './pages/admin/AdminPage'
import AddPage from './pages/admin/AddPage'
import CardPage from './pages/user/CardPage'

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
      <Route path='/card/:id' element={<CardPage />} />
    </Routes>
  )
}

export default App
