import React, { useState, useContext } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import './card-product-buttons-style.css';
import { debounce } from 'lodash'
import axios from 'axios';
import { AppContext } from '../AppContext/AppContextComponent';

const chceckApiUrl = "/api/product/check";

const CartProductButtonsComponent = ({ min, max, isBlocked, pid }) => {
    const [actualValue, setActualValue] = useState(min);
    const [blocked, setBlocked] = useState((typeof isBlocked === 'undefined') ? false : true);
    const [isValueValid, setIsValueValid] = useState(true);
    const [valueError, setValueError] = useState('');
    const context = useContext(AppContext);

    const getErrorMessageByType = (messageType) => {
        switch (messageType) {
            case 'NOT_FOUND':
                return 'Nie znaleziono przedmiotu.';
            case 'INCORRECT_QUANTITY':
                return 'Niepoprawna wartośc zamówienia.';
            default:
                return 'Nieoczekiwany błąd.';
        }
    }

    const fetchData = debounce(async (quantity, productPid) => {
        await axios.post(chceckApiUrl, {
            pid: productPid,
            quantity: quantity
        }).then((response) => {
            setActualValue(response.data.success ? quantity : min);
            context.updateProductsList(pid, quantity);
            context.setTotal(context.getTotal());
            setIsValueValid(true);
            setValueError('');
            context.setIsLoaded(true);

        }).catch((error) => {
            setValueError(getErrorMessageByType(error.response.data.errorType));
            setActualValue(min);
            context.setIsLoaded(true);

        });
    }, 1000);

    const handleChange = (event) => {

        context.setIsLoaded(false);
        var value = event.target.value;

        if (value.match('^[0-9]+$') || value == '') {
            value = parseInt(value);

        }
        else {
            setIsValueValid(false);
            setValueError('Podałeś niepoprawną wartość.')
        }
        setActualValue(parseInt(value));
        fetchData(parseInt(value), pid);
    }

    const butonOnClickHandle = (value) => {
        setActualValue(value);
        context.updateProductsList(pid, value);
        context.setTotal(context.getTotal());

    }

    return (

        <Grid className="align-right">
            <Button
                disabled={blocked || (actualValue == min)}
                onClick={() => { if (actualValue > min) butonOnClickHandle(actualValue - 1) }}
                variant="contained"
                color="primary"
                className="circle-button"
                startIcon={<RemoveCircle />} />
            <span >Obecnie masz
            <TextField
                    className="short-field"
                    onChange={handleChange}
                    value={actualValue}
                    error={!isValueValid}
                    helperText={valueError}
                />
                sztuk produktu</span>
            <Button
                disabled={blocked || (actualValue == max)}
                onClick={() => { if (actualValue < max) butonOnClickHandle(actualValue + 1) }}
                variant="contained"
                color="primary"
                className="circle-button"
                startIcon={<AddCircle />}
            />
        </Grid>

    );
};
export { CartProductButtonsComponent };