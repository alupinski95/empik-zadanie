import React, { useState } from 'react';
import { ProductListComponent } from '../ProductList/ProductListComponent';
import { AppProvider } from '../AppContext/AppContextComponent';
import './App.css';

const App = () => {

  return (
    <div className="container">
      <AppProvider>
        <ProductListComponent />
      </AppProvider>
    </div>
  );

};
export {
  App
};
