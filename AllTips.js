import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../css/all_tips.css"
function AllTips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      const querySnapshot = await getDocs(collection(db, "Farman_qoute"));
      setTips(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchTips();
  }, []);

  return (
<div className="all-tips-container">
  {tips.map((tip) => (
    <div key={tip.id} className="tip-card">
      {/* Content Section */}
      <div className="tip-content">
        {/* Category_Name */}
        <div className="tip-info">{tip.category_name}</div>

        {/* Title */}
        <div className="tip-title">{tip.reference}</div>

        {/* Reference */}
        <div className="tip-info">{tip.id}</div>
        {/* Farman */}
        <div className="tip-info">{tip.farman}</div>

        {/* Benefits Section */}
      </div>
    </div>
  ))}
</div>


  );
}

export default AllTips;
