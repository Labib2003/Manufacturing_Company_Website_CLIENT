import './App.css';
import Home from './components/pages/Home/Home';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';

function App() {
  return (
    <div className="w-4/5 mx-auto">
      <Navbar></Navbar>
      <Home></Home>
      <Footer></Footer>
    </div>
  );
}

export default App;
