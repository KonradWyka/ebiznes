import React, { useState } from 'react';
import './Platnosci.css'

const Platnosci = () => {
  const [formData, setFormData] = useState({
    imie: '',
    nazwisko: '',
    numerKarty: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Dane z formularza:', formData);
    try {
      const response = await fetch('http://localhost:8080/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas wysyłania danych');
      }
      console.log('Dane zostały pomyślnie wysłane');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='component'>
      <h2>Płatności</h2>
      <form className="formularz"  onSubmit={handleSubmit}>
        <div>
          <label htmlFor="imie">Imię:</label>
          <input
            type="text"
            id="imie"
            name="imie"
            value={formData.imie}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nazwisko">Nazwisko:</label>
          <input
            type="text"
            id="nazwisko"
            name="nazwisko"
            value={formData.nazwisko}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="numerKarty">Numer karty kredytowej:</label>
          <input
            type="text"
            id="numerKarty"
            name="numerKarty"
            value={formData.numerKarty}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Zatwierdź płatność</button>
      </form>
    </div>
  );
}

export default Platnosci;
