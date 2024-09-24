import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import WalletGenerator from './components/WalletGenerator'

function App() {

  return (
    <div className='flex flex-col min-h-[100vh] h-100 justify-between'>
      <div>
      <Navbar />
      <WalletGenerator />
      </div>
      <Footer />
    </div>
  )
}

export default App
