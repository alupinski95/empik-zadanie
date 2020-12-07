
import React from 'react';
import { shallow } from 'enzyme';
import { ProductComponent } from '../Product/ProductComponent';
import { CartProductButtonsComponent } from '../CartProductButtons/CartProductButtonsComponent';



const item = {
    "pid": "8e5e1248-c799-4937-9acc-2b3ab0e034ff",
    "name": "Patelnia",
    "price": "89.99",
    "max": 10,
    "min": 1
};

it('includes CartProductButtonsComponent', () => {
    const product1 = shallow(<ProductComponent productItem={item} key={item.pid} />);
    expect(product1.containsMatchingElement(<CartProductButtonsComponent
        min={item.min}
        max={item.max}
        isBlocked={item.isBlocked}
        pid={item.pid} />)).toEqual(true);
});


it(`sgenerateg product with mock name `, () => {
    const product = shallow(<ProductComponent productItem={item} key={item.pid} />);
    console.log(product.debug());
    expect(product.find('WithStyles(ForwardRef(Typography))[variant="h5"]').text()).toEqual(item.name);
});