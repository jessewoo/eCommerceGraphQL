import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
// Don't use Query and Mutation component
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

// Access to data property
const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// Container layer - care about what to do with the cart icon, getting the data
// Cart Icon - just a presentational dummy component
const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => {
  return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />;
};

// Compose - higher order component - access to props, query properties, mutation properties
export default flowRight(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);
