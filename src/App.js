import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/notfound' element={<NotFound />} />
            <Route exact path='/*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
