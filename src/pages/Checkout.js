import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { clearCart } from '../store/slices/cartSlice';

const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const OrderSummary = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
`;

function Checkout() {
  const { cartItems, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    dispatch(clearCart());
    // Redirect to order confirmation
  };

  return (
    <CheckoutContainer>
      <h1>Checkout</h1>

      <Form onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={shippingInfo.fullName}
          onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="ZIP Code"
          value={shippingInfo.zipCode}
          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={shippingInfo.country}
          onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
          required
        />

        <OrderSummary>
          <h2>Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
        </OrderSummary>

        <button type="submit">Place Order</button>
      </Form>
    </CheckoutContainer>
  );
}

export default Checkout;