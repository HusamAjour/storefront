import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import Show from './Show';
import ProductDetails from './ProductDetails';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import {
  get,
  changeActiveCategory,
  changeActiveProduct,
  fetchData,
} from '../rtk-store/data.store';
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
  const dispatch = useDispatch();

  const classes = useStyles();
  useEffect(() => {
    props.fetchData();
  }, [props.fetchData]);

  const getProductId = (id) => {
    return id;
  };
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
                <Link to="/">
                  <ListItemText
                    className={classes.listItem}
                    primary={category.display_name}
                    key={category._id}
                    // onClick={() => dispatch(changeActiveCategory(category.name))}
                    onClick={() => props.changeActiveCategory(category.name)}
                  />
                </Link>
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
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route exact path="/products/:product">
            {!props.dataProps.activeProduct ? <Redirect to="/" /> : <ProductDetails />}
            {console.log(props.dataProps.activeProduct)}
          </Route>
        </Switch>
      </div>

    </Container>
  );
}

const mapStateToProps = (state) => ({
  dataProps: state.data,
});

const mapDispatchToProps = {
  get,
  changeActiveCategory,
  changeActiveProduct,
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
