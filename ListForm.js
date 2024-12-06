import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../css/userform.css';
const ListForm = ({ data }) => {
    const [categories, setCategories] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate(); // Hook to navigate between pages
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'categories'));
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="form-container">
        <h1>List Form</h1>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="" disabled>
                Select a Category
            </option>
            {categories.map((category) => (
                <option key={category.id} value={category.name}>
                    {category.name}
                </option>
            ))}
        </select>

            {selectedOption && (
                <div style={{ marginTop: '20px' }}>
                    <p>
                        <strong>Selected Name:</strong> {selectedOption}
                    </p>
                </div>
            )}

            {/* "Previous" Button */}
            <button 
                type="button" 
                onClick={() => navigate('/')} // Navigate back to the form page
                style={{ marginTop: '20px' }}
            >
                Previous
            </button>
        </div>
    );
};

export default ListForm;
