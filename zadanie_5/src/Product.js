import React, { useState, useEffect } from 'react';
import './Product.css';

const Produkty = () => {
  const [produkty, setProdukty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/products');
        if (!response.ok) {
          throw new Error('Wystąpił błąd podczas pobierania danych');
        }
        const data = await response.json();
        setProdukty(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='product-comp'>
      <h2>Produkty</h2>
      <ul>
        {produkty.map((produkt) => (
          <li key={produkt.ID}>
            <div className="produkt">
              <span className="nazwa">{produkt.Name}</span>
              <span className="cena">{produkt.Price} zł</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produkty;
