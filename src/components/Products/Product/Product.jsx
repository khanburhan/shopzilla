import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <Card className={`${classes.root} ${classes.cardBackground}`}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="body1" component="h2">
            {product.name}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          component="p"
          className={classes.productDescription}
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Typography gutterBottom variant="body1" component="h2">
          ${product.price.formatted}
        </Typography>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart className={classes.cartAddButton} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
