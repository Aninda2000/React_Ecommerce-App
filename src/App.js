import Products from "./components/Products";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Products />
      </div>
    </>
  );
}

export default App;
