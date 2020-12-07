import React, { useState } from "react";



const AppContext = React.createContext();

const AppProvider = (props) => {
    const [isLoaded, setIsLoaded] = useState(true);
    const [cartTotal, setTotal] = useState(0);
    const [products, setProducts] = useState([]);

    const createProductsList = (data) => {
        data.forEach(item => {
            products.push(
                {
                    pid: item.pid,
                    quantity: item.min,
                    price: parseFloat(item.price)
                });
        })
    }

    const updateProductsList = (pid, quantity) => {
        let index = products.findIndex(item => item.pid == pid);
        products[index].quantity = quantity;
    }

    const getTotal = () => {
        let totalHelper = 0;
        products.forEach(item => {
            totalHelper += item.quantity * parseFloat(item.price);
        })
        return parseFloat(totalHelper).toFixed(2);
    }

    const userSettings = {
        isLoaded: isLoaded,
        cartTotal: cartTotal,
        products: products,
        setProducts: setProducts,
        setIsLoaded: setIsLoaded,
        setTotal: setTotal,
        getTotal: getTotal,
        createProductsList: createProductsList,
        updateProductsList: updateProductsList
    };


    return (
        <AppContext.Provider value={userSettings}>
            {props.children}
        </AppContext.Provider>
    )
}
export { AppProvider, AppContext };

