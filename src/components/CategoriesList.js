import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { add, remove, reset } from '../store/cart.js';
import ProductCard from './ProductCard';
import Show from './Show';
import * as actions from '../store/actions';

import {
  Grid,
  Container,
  Typography,
  List,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '0 0 30px',
  },
  flexList: {
    display: 'flex',
  },
  listItem: {
    cursor: 'pointer',
    color: '#6e7ac6',
    padding: '0 15px 0 0',
    width: 'fit-content',
    display: 'block',
    flex: 'none',
  },
  categoriesTitle: {
    color: '#838383',
    padding: '30px 0 5px',
    textAlign: 'left',
  },
  gridPadding: {
    padding: '200px 0 0',
  },
  divider: {
    margin: '0 15px 0 0',
  },
}));

function CategoriesList(props) {
  const fetchData = async () => {
    document.title = document.title;
    await props.get();
  };

  const classes = useStyles();
  useEffect(() => {
    fetchData();
  }, ['']);

  // useEffect(() => {
  //   setValue(props);
  // }, [value]);
  return (
    <Container maxWidth={'lg'}>
      <div className={classes.root}>
        <Typography
          className={classes.categoriesTitle}
          gutterBottom
          variant="h6"
          component="h2"
        >
          Browse our Categories{' '}
        </Typography>
        {console.log('after getting data:====> ', props.dataProps)}
        <List className={classes.flexList}>
          {props.dataProps.categories.map((category, i) => {
            return (
              <>
                <ListItemText
                  className={classes.listItem}
                  primary={category.display_name}
                  key={category._id}
                  onClick={() => props.changeActiveCategory(category.name)}
                />
                <Show condition={i !== props.dataProps.categories.length - 1}>
                  <Divider
                    className={classes.divider}
                    orientation="vertical"
                    flexItem
                  />
                </Show>
              </>
            );
          })}
        </List>

        {props.dataProps.categories.map((category, i) => {
          if (category.name === props.dataProps.activeCategory) {
            return (
              <Typography
                key={i * 232}
                gutterBottom
                variant="h2"
                component="h1"
              >
                {category.display_name}
              </Typography>
            );
          }
          return null;
        })}

        <Grid container spacing={4} className={classes.gridPadding}>
          {props.dataProps.products.map((product, i) => {
            if (product.category === props.dataProps.activeCategory) {
              return (
                <Grid item xs={4} key={product._id}>
                  <ProductCard
                    className={classes.textAlignLeft}
                    wholeProduct={product}
                    productName={product.display_name}
                    inStock={product.inStock}
                    price={product.price}
                  />
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  dataProps: state.data,
  cartItems: state.cart,
});

const mapDispatchToProps = (dispatch, getState) => ({
  get: () => dispatch(actions.getRemoteData()),
  changeActiveCategory: (name) => dispatch(actions.changeActiveCategory(name))
});

// const mapDispatchToProps = { category, add, remove, reset };

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
