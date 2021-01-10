import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeePage from './views/EmployeePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <EmployeePage />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
