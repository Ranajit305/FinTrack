import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budget from './pages/Budget'
import { useTransactionStore } from './stores/useTransactionStore'
import Analytics from './pages/Analytics'
import Footer from './components/Footer'
import { useBudgetStore } from './stores/useBudgetStore'

const App = () => {

  const { getTransactions } = useTransactionStore();
  const { getBudgets } = useBudgetStore();

  useEffect(() => {
    getTransactions();
    getBudgets();
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/budget' element={<Budget />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App