import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../css/userform.css';
const Form = ({ setData, data }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [preview, setPreview] = useState(null);

    const navigate = useNavigate(); // Hook to handle navigation

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {        
        e.preventDefault();
        if (name.trim()) {
            try {
                // Add data to Firestore
                await addDoc(collection(db, 'Tip_Category'), {
                    categoryName: name,
                });
                alert('Data added successfully!');
                setName('');
                setImageUrl('');
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }
    };

    return (
        <div className="form-container">
            <h1>User Input Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter the Category"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Preview" />
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button type="submit">Submit</button>
                    <button
                        type="button"
                        onClick={() => navigate('/list-form')}
                        style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px' }}
                    >
                        Go to List Form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
