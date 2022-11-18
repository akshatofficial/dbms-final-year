import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Jobs from "./Pages/Jobs";
import Process from "./Pages/Process";
import Application from "./Pages/Application";
import Interviews from "./Pages/Interviews";
import Update from "./Pages/Interviews/update/Update";
import Queries from "./Pages/Queries";
import Navbar from "./component/Navbar";
import Landing from "./Pages/Landing";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/process" element={<Process />} />
          <Route path="/application" element={<Application />} />
          <Route path="/interview-and-test" element={<Interviews />} />
          <Route path="/update-application-test/:id" element={<Update />} />
          <Route path="/queries" element={<Queries/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
