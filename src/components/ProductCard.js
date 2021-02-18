import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  get,
  changeActiveCategory,
  changeActiveProduct,
  fetchData,
} from '../rtk-store/data.store';
import { add, remove } from '../rtk-store/cart.store';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Show from './Show';
const useStyles = makeStyles({
  textAlignLeft: {
    textAlign: 'left',
  },
  media: {
    height: 140,
  },
  boxDirection: {
    justifyContent: 'space-between',
    margin: '20px 0 0',
    padding: '0',
  },
});

function ProductCard(props) {
  const classes = useStyles();
  let productName = props.productName;
  return (
    <Card>
      {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
      <CardContent>
        <Typography
          className={classes.textAlignLeft}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {props.productName}
        </Typography>
        <Box
          className={classes.boxDirection}
          display="flex"
          p={1}
          bgcolor="background.paper"
        >
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Price: ${props.price}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            In Stock: {props.inStock}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Show condition={props.inStock > 0}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              props.add(props.wholeProduct);
            }}
          >
            ADD TO CART
          </Button>
        </Show>
        <Show condition={props.inStock > 0}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              props.remove(props.wholeProduct);
            }}

          >
            REMOVE FROM CART
          </Button>
        </Show>
        <Button
          size="small"
          color="primary"
          onClick={() => props.changeActiveProduct(props.wholeProduct._id)}
        >
          <NavLink to={`/products/${props.wholeProduct._id}`}>
            VIEW DETAILS
          </NavLink>
        </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  dataProps: state.data,
  cartItems: state.cart,
});

const mapDispatchToProps = {
  get,
  changeActiveCategory,
  changeActiveProduct,
  fetchData,
  remove,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
