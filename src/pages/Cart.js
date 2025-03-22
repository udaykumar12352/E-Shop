import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

function Cart() {
  const { cartItems, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <CartContainer>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Continue Shopping</Link></p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </CartItem>
          ))}

          <div>
            <h3>Total: ${total.toFixed(2)}</h3>
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </CartContainer>
  );
}

export default Cart;