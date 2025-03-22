import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

const WishlistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const WishlistItem = styled.div`
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

function Wishlist() {
  const { items } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <WishlistContainer>
      <h1>My Wishlist</h1>

      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <WishlistGrid>
          {items.map(item => (
            <WishlistItem key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => handleMoveToCart(item)}>Move to Cart</button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </WishlistItem>
          ))}
        </WishlistGrid>
      )}
    </WishlistContainer>
  );
}

export default Wishlist;