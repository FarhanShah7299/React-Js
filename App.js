import React, { useState } from "react";
import "./css/style.css";
import AddCategories from "./component/AddCategories";
import AllCategories from "./component/AllCategories";
import AddTips from "./component/AddTips";
import AllTips from "./component/AllTips";

function App() {
  const [activeComponent, setActiveComponent] = useState("AllCategories");

  return (
    <div className="container">
      <div className="row">
        <button onClick={() => setActiveComponent("AllCategories")}>All Categories</button>
        <button onClick={() => setActiveComponent("AddCategories")}>Add Categories</button>
        <button onClick={() => setActiveComponent("AllTips")}>All Tips</button>
        <button onClick={() => setActiveComponent("AddTips")}>Add Tips</button>
      </div>

      <div className="row">
        {activeComponent === "AllCategories" && <AllCategories />}
        {activeComponent === "AddCategories" && <AddCategories />}
        {activeComponent === "AllTips" && <AllTips />}
        {activeComponent === "AddTips" && <AddTips />}
      </div>
    </div>
  );
}

export default App;
