import React from 'react';
import { connect } from 'react-redux';
import Show from './Show';
import {
  get,
  changeActiveCategory,
  changeActiveProduct,
  fetchData,
} from '../rtk-store/data.store';
import { add, remove } from '../rtk-store/cart.store';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

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

function ProductDetails(props) {
  const classes = useStyles();

  let activeProduct = props.dataProps.products.reduce((cumm, prod) => {
    if (prod._id === props.dataProps.activeProduct) {
      cumm = prod;
    }
    return cumm;
  }, {});

  return (
    <>
      <Typography gutterBottom variant="h3" component="h1">
        {activeProduct.display_name}
      </Typography>
      <Typography gutterBottom variant="h6" component="h6">
        {activeProduct.description}
      </Typography>
      <Card>
        {/* <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          /> */}
        <CardContent>
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
              Price: ${activeProduct.price}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              In Stock: {activeProduct.inStock}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Show condition={activeProduct.inStock > 0}>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                props.add(activeProduct);
              }}
            >
              ADD TO CART
            </Button>
          </Show>
          <Show condition={activeProduct.inStock > 0}>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                props.remove(activeProduct);
              }}
            >
              REMOVE FROM CART
            </Button>
          </Show>
        </CardActions>
      </Card>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Related Product</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav" aria-label="secondary mailbox folders">
            {props.dataProps.products.map((product) => {
              if (product.category === activeProduct.category && product._id !== activeProduct._id) {
                return (
                <NavLink to={`/products/${product._id}`}key={product._id} onClick={()=> props.changeActiveProduct(product._id)}>
                  <ListItem>
                    <ListItemText primary={product.display_name} />
                  </ListItem>
                  </NavLink>
                );
              } else {
                return null;
              }
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
