import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { ProductListComponent } from '../ProductList/ProductListComponent';


it('includes ProductListComponent', () => {
    const app = shallow(<App />);
    expect(app.containsMatchingElement(<ProductListComponent />)).toEqual(true)
});

