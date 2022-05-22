import './App.css';
import Home from './components/pages/Home/Home';
import Navbar from './components/shared/Navbar';

function App() {
  return (
    <div className="w-4/5 mx-auto">
      <Navbar></Navbar>
      <Home></Home>
    </div>
  );
}

export default App;
