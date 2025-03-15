import React from 'react';
import CreateProductForm from './components/CreateProductForm';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Inventory Management</h1>
            <CreateProductForm />
        </div>
    );
};

export default App;