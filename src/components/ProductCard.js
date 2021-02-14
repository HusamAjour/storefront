import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  textAlignLeft: {
    textAlign: 'left',
  },
  media: {
    height: 140,
  },
});

function ProductCard(props) {
  const classes = useStyles();
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
        {/* <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          ADD TO CART
        </Button>
        <Button size="small" color="primary">
          VIEW DETAILS
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
