import React, { useState } from 'react';
import { Grid, Paper, ButtonBase, Typography } from '@material-ui/core';
import './product-style.css';
import NoProductImage from '../../images/no-camera.svg';
import { CartProductButtonsComponent } from '../CartProductButtons/CartProductButtonsComponent';
import { AppContext } from '../AppContext/AppContextComponent';

const ProductComponent = ({ productItem }) => {
  const [item, setItem] = useState(productItem);
  const priceFormat = (price, region, currency) => {
    var formatter = new Intl.NumberFormat(region, {
      style: 'currency',
      currency: currency,
    })
    return formatter.format(price);
  }
  return (
    <Grid className="main-container-style">
      <Paper className="paper" spacing={2} >
        <Grid container spacing={2}>
          <Grid item xs={2} sm={2}>
            <ButtonBase className="image-container">
              <NoProductImage />
            </ButtonBase>
          </Grid>
          <Grid item xs={10} sm={10}
            container
            direction="row"
            justify="flex-start"
            alignItems="center">
            <Grid item xs>
              <Typography variant="h5">
                {item.name}
              </Typography>
            </Grid>
            <Grid item xs>
              <Grid container
                direction="column"
                justify="flex-end"
                className="prize-contener">
                <Typography variant="subtitle1" align="right">
                  {priceFormat(item.price, 'pl-PL', 'PLN')}
                </Typography>
                <CartProductButtonsComponent
                  min={item.min}
                  max={item.max}
                  isBlocked={item.isBlocked}
                  pid={item.pid} />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )

};
export { ProductComponent };