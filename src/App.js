import { Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  return (
    <section className="App bg-[#f5f5f7] h-screen bg-cover md:bg-top">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      ></link>

      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </section>
  );
}

export default App;
