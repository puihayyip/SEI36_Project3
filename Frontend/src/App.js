import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, createContext } from "react";

import UserSelection from "./pages/UserSelection";
import Login from "./pages/Login";
import AddUsers from './pages/AddUsers'
import Order from "./pages/OrderTabComponents/Order";

import CashierMainView from "./pages/CashierComponents/CashierMainView"

export const stateContext = createContext();

function App() {
  const [state, setState] = useState({});
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <stateContext.Provider value={[state, setState]}>
        <BrowserRouter>
          {/* <Head /> */}
          <Routes>
            <Route
              path="/"
              element={<UserSelection setUser={setUser} user={user} />}
            >
              <Route path="/login" element={<Login user={user} />} />
            </Route>


            <Route path="/superSecurePath" element={<Order />} />
            <Route path="/cashier" element={<CashierMainView />} />

          </Routes>
        </BrowserRouter>
      </stateContext.Provider>
    </div>
  );
}

export default App;
