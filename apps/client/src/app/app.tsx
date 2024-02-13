import { Route, Routes } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Footer from '../components/Footer';
import AddExpense from '../pages/AddExpense';
import ExpenseDetails from '../pages/ExpenseDetails';

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
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/expense-details" element={<ExpenseDetails />} />
      </Routes>
      <div role="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
