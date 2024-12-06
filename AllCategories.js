import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function AllCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Categories"));
      setCategories(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchCategories();
  }, []);

  return (
    <ul className="list">
      {categories.map((category) => (
        <li key={category.id}>{category.Category_Name}</li>
      ))}
    </ul>
  );
}

export default AllCategories;
