import React from 'react';
import '../../styles/ProductTable.css';

const ProductTable = ({ products }) => {
  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>{product.stock}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <img
                  src={product.productPhoto}
                  alt={product.productName}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
