import React, { useState } from 'react';
import './Contacto.css'; // Importamos el archivo de estilos

const Contacto = () => {
    const [mensajeMostrado, setMensajeMostrado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensajeMostrado(true);
    };

    return (
        <div className="contacto-container">
            <h2>Contacto</h2>
            <form onSubmit={handleSubmit} className="contacto-form">
                <input type="text" placeholder="Nombre" required className="contacto-input" />
                <input type="email" placeholder="Correo" required className="contacto-input" />
                <button type="submit" className="contacto-btn">Enviar</button>
            </form>

            {mensajeMostrado && <p className="mensaje">Nos comunicaremos contigo en cuanto podamos!</p>}
        </div>
    );
};

export default Contacto;
