import React, { useState } from 'react';

interface Product {
    name: string;
    category: string;
    unitPrice: number;
    quantityInStock: number;
    expirationDate: string | null;
}

const CreateProductForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [unitPrice, setUnitPrice] = useState<string>('');
    const [quantityInStock, setQuantityInStock] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const product: Product = {
            name,
            category,
            unitPrice: parseFloat(unitPrice),
            quantityInStock: parseInt(quantityInStock),
            expirationDate: expirationDate || null,
        };

        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Product created:', data);
            // Reset form fields
            setName('');
            setCategory('');
            setUnitPrice('');
            setQuantityInStock('');
            setExpirationDate('');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required /><br /><br />
            <label htmlFor="unitPrice">Unit Price:</label>
            <input type="number" id="unitPrice" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} step="0.01" required /><br /><br />
            <label htmlFor="quantityInStock">Quantity in Stock:</label>
            <input type="number" id="quantityInStock" value={quantityInStock} onChange={(e) => setQuantityInStock(e.target.value)} required /><br /><br />
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input type="date" id="expirationDate" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} /><br /><br />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProductForm;