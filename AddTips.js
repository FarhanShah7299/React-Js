import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

function AddTips() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_name: "",
    reference: "",
    farman: "",
    id : ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Categories"));
      setCategories(querySnapshot.docs.map((doc) => doc.data().Category_Name));
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Farman_qoute"), formData);
      alert("Tip added successfully!");
      setFormData({
        category_name: "",
        reference: "",
        farman: "",
        id : ""
      });
    } catch (error) {
      console.error("Error adding tip:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <select
        value={formData.category_name}
        onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="id"
        value={formData.id}
        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
      />

      <textarea
        placeholder="Farman"
        value={formData.farman}
        onChange={(e) => setFormData({ ...formData, farman: e.target.value })}
      />

      <input
        type="text"
        placeholder="Reference"
        value={formData.reference}
        onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
      />

      <button type="submit">Add Tip</button>
    </form>
  );
}

export default AddTips;
