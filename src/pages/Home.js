import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.background};
`;

const FeaturedProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCard = styled.div`
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

function Home() {
  const featuredProducts = [
    { id: 1, name: 'iphone 14 Pro', price: 999.99, image: 'https://tse3.mm.bing.net/th?id=OIP.jwYzFp6zJuljFEwpmYNpqQHaFj&pid=Api&P=0&h=180' },
    { id: 3, name: 'Nike air max', price: 129.99, image: 'https://tse3.mm.bing.net/th?id=OIP.twYd5zuHTlu1kjeHjn-ovAHaG5&pid=Api&P=0&h=180' },
    { id: 7, name: 'Adidas Track Suit', price: 89.99, image: 'https://tse3.mm.bing.net/th?id=OIP.V5REppYlV2_0p_P3ZH4k6wAAAA&pid=Api&P=0&h=180' },
  ];

  return (
    <div>
      <HeroSection>
        <h1>Welcome to E-Shop</h1>
        <p>Discover amazing products at great prices</p>
        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </HeroSection>

      <section>
        <h2>Featured Products</h2>
        <FeaturedProducts>
          {featuredProducts.map(product => (
            <ProductCard key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Link to={`/product/${product.id}`}>View Details</Link>
            </ProductCard>
          ))}
        </FeaturedProducts>
      </section>
    </div>
  );
}

export default Home;