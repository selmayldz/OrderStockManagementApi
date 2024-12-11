import React from 'react';
import '../styles/CustomerList.css';

const CustomerList = () => {
    return (
        <table className="customer-table">
            <thead>
                <tr>
                    <th>CustomerID</th>
                    <th>Ad</th>
                    <th>Tür</th>
                    <th>Bütçe</th>
                    <th>Bekleme Süresi</th>
                    <th>Öncelik Skoru</th>
                </tr>
            </thead>
            <tbody>
                {/* Burada API'den alınan verilerle doldurulacak */}
                <tr>
                    <td>1</td>
                    <td>Ali</td>
                    <td>Premium</td>
                    <td>1500</td>
                    <td>10</td>
                    <td>25</td>
                </tr>
            </tbody>
        </table>
    );
};

export default CustomerList;
