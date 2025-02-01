
import React from 'react';
import './Filter.css';

const Filter = () => {
  return (
    <div className="filter-container">
      <h2>Filter Phones</h2>

      <div className="filter-section">
        <h3>Brand:</h3>
        {['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Oppo', 'Vivo', 'Nothing'].map((brand) => (
          <label key={brand}>
            <input type="checkbox" id={brand} name="brand" />
            <span className="checkbox-label">{brand}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Price Range:</h3>
        {['$0 - $500', '$501 - $700', '$701 - $1000', '$1001 - $1500'].map((priceRange) => (
          <label key={priceRange}>
            <input type="radio" name="price" id={priceRange} />
            <span className="radio-label">{priceRange}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Memory:</h3>
        {['64GB', '128GB', '256GB', '512GB', '1TB'].map((memory) => (
          <label key={memory}>
            <input type="radio" name="memory" id={memory} />
            <span className="radio-label">{memory}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>RAM:</h3>
        {['4GB', '6GB', '8GB', '12GB'].map((ram) => (
          <label key={ram}>
            <input type="radio" name="ram" id={ram} />
            <span className="radio-label">{ram}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
