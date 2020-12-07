import React, { useContext, useEffect, useState } from 'react';
import { ProductComponent } from '../Product/ProductComponent';
import { AppContext } from '../AppContext/AppContextComponent';
import { Grid, Paper } from '@material-ui/core';
import { LoadingScreenComponent } from '../Share/LoadingScreen/LoadingScreenComponent';
import axios from 'axios';
import './product-list-style.css';
const apiUrl = "/api/cart";

const ProductListComponent = () => {
    const [error, setError] = useState(false);
    const [items, setItems] = useState([]);
    const context = useContext(AppContext);

    useEffect(async () => {
        const fetchData = async () => {
            await axios.get(apiUrl)
                .then(response => {
                    setItems(response.data);
                    context.createProductsList(response.data);
                    context.setTotal(context.getTotal());
                    context.setIsLoaded(true);
                }).catch(err => {
                    setError(err.message);
                    context.setIsLoaded(true);
                })
        }
        fetchData();
    }, []);
    return (
        <Paper className="list-paper">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                style={{ flexGrow: 1, background: "", }}>
                <h3>Lista produktów:</h3>
                {items.map(item => {
                    return (
                        <ProductComponent
                            productItem={item} key={item.pid} />
                    )
                })}
                {!context.isLoaded ? <LoadingScreenComponent /> : <></>}
                {error ? <div>Error: {error.message}</div> : <></>}

            </Grid>
            {context.cartTotal != 0 ?
                <p className="total">Suma zamówienia: {context.cartTotal}</p>
                : <></>}

        </Paper>


    );



};
export { ProductListComponent };