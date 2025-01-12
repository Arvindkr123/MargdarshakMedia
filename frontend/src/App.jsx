import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddAccount from "./components/AddAccount";
import Accounts from "./components/Accounts";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/add-account" element={<AddAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
