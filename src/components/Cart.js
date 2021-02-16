import React from 'react';
import Show from './Show';
import * as actions from '../store/actions';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Button, ButtonGroup } from '@material-ui/core';
// import { add, remove, reset } from '../store/cart.js';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  dropdownItem: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  btn: {
    padding: '0',
  },
  btnGroup: {
    marginLeft: '25px',
  },
  root: {
    width: '100%',
    maxWidth: 500,
  },
});
function Cart(props) {
  const classes = useStyles();
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="Primary" id="dropdown-basic">
          <Badge badgeContent={props.cartItems.total} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {console.log('inside cart component======>', props.cartItems.items)}
          {props.cartItems.items.map((item, idx) => {
            return (
              <Dropdown.ItemText className={classes.dropdownItem}>
                <Badge badgeContent={item.quantity} color="primary">
                  {item.product.display_name}
                </Badge>
                <ButtonGroup className={classes.btnGroup}>
                  <Button
                    className={classes.btn}
                    aria-label="reduce"
                    onClick={async () => {
                      // props.remove(item.product);
                      await props.update('REMOVE',item.product);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    className={classes.btn}
                    aria-label="increase"
                    onClick={async() => {
                      // props.add(item.name);
                      await props.update('ADD', item.product);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Dropdown.ItemText>
            );
          })}
          {/* <Dropdown.Item
            onClick={() => {
              props.reset();
            }}
          >
            Reset <RotateLeftIcon />
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  dataProps: state.data,
});

const mapDispatchToProps = (dispatch, getState) => ({
  // add: (item)=> dispatch(actions.add(item)),
  // remove: (item)=> dispatch(actions.remove(item)),
  update: (actionType, item) => dispatch(actions.updateAndGetData(actionType, item)),
  changeActiveCategory: (name) => dispatch(actions.changeActiveCategory(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
