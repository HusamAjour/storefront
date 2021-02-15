import React from 'react';
import { connect } from 'react-redux';
import { category } from '../store/data.js';
import { add, remove, reset } from '../store/cart.js';
import ProductCard from './ProductCard';
import Show from './Show';
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
  const classes = useStyles();
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

        <List className={classes.flexList}>
          {props.dataProps.categories.map((category, i) => {
            return (
              <>
                <ListItemText
                  className={classes.listItem}
                  primary={category.displayName}
                  key={i * 5003}
                  onClick={() => props.category(category.name)}
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
                {category.displayName}
              </Typography>
            );
          }
          return null;
        })}

        <Grid container spacing={4} className={classes.gridPadding}>
          {props.dataProps.products.map((product, i) => {
            if (product.category === props.dataProps.activeCategory) {
              return (
                <Grid item xs={4} key={i * 32}>
                  <ProductCard
                    className={classes.textAlignLeft}
                    productName={product.name}
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

const mapDispatchToProps = { category, add, remove, reset };

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
