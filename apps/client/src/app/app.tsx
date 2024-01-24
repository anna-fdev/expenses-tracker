import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Footer from '../components/Footer';
import Categories from '../pages/Categories';

export function App() {
  return (
    <div>
      <div role="navigation">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
      <div role="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
