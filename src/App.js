
import './App.css';
import React from "react";
import Dock from "./Components/DockMenu";
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc"; 

function App() {
  const items = [
    { icon: <VscHome size={24} />, label: "Home", onClick: () => alert("Home!") },
    { icon: <VscArchive size={24} />, label: "Archive", onClick: () => alert("Archive!") },
    { icon: <VscAccount size={24} />, label: "Profile", onClick: () => alert("Profile!") },
    { icon: <VscSettingsGear size={24} />, label: "Settings", onClick: () => alert("Settings!") },
  ];

  return (
    <div>
      
      <Dock items={items} />
    </div>
  );
}

export default App;
