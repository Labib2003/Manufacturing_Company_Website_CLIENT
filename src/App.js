import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/pages/Dashboard/Dashboard';
import MyOrders from './components/pages/Dashboard/MyOrders';
import Payment from './components/pages/Dashboard/Payment';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Login/Register';
import Purchase from './components/pages/Purchase/Purchase';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';
import RequiteAuth from './components/shared/RequiteAuth';

function App() {
  return (
    <div className="w-full p-5 md:w-4/5 md:p-0 mx-auto">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/tools/:id' element={<RequiteAuth><Purchase></Purchase></RequiteAuth>}></Route>
        <Route path='/dashboard' element={<RequiteAuth><Dashboard></Dashboard></RequiteAuth>}>
          <Route index element={<MyOrders></MyOrders>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
