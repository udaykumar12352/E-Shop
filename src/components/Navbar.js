import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 50%;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

function Navbar({ toggleTheme, isDarkMode }) {
  const { cartItems } = useSelector(state => state.cart);
  const { items } = useSelector(state => state.wishlist);
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Nav>
      <NavContainer>
        <Link to="/">E-Shop</Link>
        <NavLinks>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart <Badge>{cartItems.length}</Badge></Link>
          <Link to="/wishlist">Wishlist <Badge>{items.length}</Badge></Link>
          {isAuthenticated ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <button onClick={toggleTheme}>
            {isDarkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;