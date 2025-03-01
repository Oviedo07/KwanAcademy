import './App.css';
// import Defensa from './screens/Defensa_1';
import Benefits from './screens/Benefits';
import Contact from './screens/Contact';
import Home from './screens/Home';
import HowWeWork from './screens/HowWeWork';
import Services from './screens/Services';
import Navbar from './components/Navbar';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Services />
      <HowWeWork />
      <Benefits />
      <Contact />
      {/* <Defensa /> */}
    </div>
    
  );
}

export default App;
