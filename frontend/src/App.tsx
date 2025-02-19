import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://backend:5000/')
            .then(response => setMessage(response.data))
            .catch(error => console.error("Erreur d'accès à l'API:", error));
    }, []);

    return (
        <div>
            <h1>VoltRide Frontend 🚀</h1>
            <p>Message du backend : {message}</p>
        </div>
    );
}

export default App;
