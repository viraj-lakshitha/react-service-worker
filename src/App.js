import { Link, Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import Post from "./pages/post";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid d-flex">
          <div className="nav-brand">
            <Link to='/'>Home</Link>
          </div>
          <div className="nav-item">
            <Link to='/post'>Posts</Link>
            <Link to='/about'>About</Link>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
