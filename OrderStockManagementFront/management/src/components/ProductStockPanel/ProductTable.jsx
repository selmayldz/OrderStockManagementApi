import React from 'react';
import '../../styles/ProductTable.css';

const ProductTable = ({ products }) => {
  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={product.productPhoto}
                  alt={product.productName}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
