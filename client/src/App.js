import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
