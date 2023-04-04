import "./App.css"; // Import CSS file
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Screen1 from "./Screens/Screen1/Screen1";
import Screen2 from "./Screens/Screen2/Screen2";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar text="Remove Duplicate Characters" />
      <Routes>
        <Route path="/" element={<Screen1 />} /> 
        <Route path="/Screen2" element={<Screen2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
