import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const FiltersSection = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  margin-right: 1rem;
`;

const ProductCard = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  background: ${({ theme }) => theme.background};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
  }

  .price {
    color: ${({ theme }) => theme.primary};
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

function Products() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: 'all'
  });

  const dispatch = useDispatch();

  const products = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      price: 999.99,
      category: 'electronics',
      image: 'https://tse3.mm.bing.net/th?id=OIP.jwYzFp6zJuljFEwpmYNpqQHaFj&pid=Api&P=0&h=180',
      description: 'Latest iPhone with advanced camera system'
    },
    {
      id: 2,
      name: 'Samsung 4K Smart TV',
      price: 799.99,
      category: 'electronics',
      image: 'https://tse3.mm.bing.net/th?id=OIP.9YXkghu6iDMlTchKfJ7u0wHaEv&pid=Api&P=0&h=180',
      description: '55-inch 4K Ultra HD Smart LED TV'
    },
    {
      id: 3,
      name: 'Nike Air Max',
      price: 129.99,
      category: 'footwear',
      image: 'https://tse3.mm.bing.net/th?id=OIP.twYd5zuHTlu1kjeHjn-ovAHaG5&pid=Api&P=0&h=180',
      description: 'Comfortable running shoes with air cushioning'
    },
    {
      id: 4,
      name: 'Levi\'s 501 Jeans',
      price: 69.99,
      category: 'clothing',
      image: 'https://tse3.mm.bing.net/th?id=OIP.hR7C5cQdvzEDByarw_RIswHaJ4&pid=Api&P=0&h=180',
      description: 'Classic fit denim jeans'
    },
    {
      id: 5,
      name: 'MacBook Pro',
      price: 1299.99,
      category: 'electronics',
      image: 'https://tse2.mm.bing.net/th?id=OIP.UdyKBeL95ssn3XkoTvfnrwHaDL&pid=Api&P=0&h=180',
      description: '13-inch MacBook Pro with M2 chip'
    },
    {
      id: 6,
      name: 'Sony WH-1000XM4',
      price: 349.99,
      category: 'electronics',
      image: 'https://tse2.mm.bing.net/th?id=OIP.e58DFjzxJ0WLYWkVFtaPFQHaE7&pid=Api&P=0&h=180',
      description: 'Wireless noise-canceling headphones'
    },
    {
      id: 7,
      name: 'Adidas Track Suit',
      price: 89.99,
      category: 'clothing',
      image: 'https://tse3.mm.bing.net/th?id=OIP.V5REppYlV2_0p_P3ZH4k6wAAAA&pid=Api&P=0&h=180',
      description: 'Comfortable athletic wear'
    },
    {
      id: 8,
      name: 'Canon EOS R6',
      price: 2499.99,
      category: 'electronics',
      image: 'https://tse2.mm.bing.net/th?id=OIP.eLzKBeL-4_Uku_wQxnuW4QHaEK&pid=Api&P=0&h=180',
      description: 'Full-frame mirrorless camera'
    }
  ];

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <FiltersSection>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
        </select>
      </FiltersSection>

      <ProductsGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <div className="buttons">
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
            </div>
          </ProductCard>
        ))}
      </ProductsGrid>
    </div>
  );
}

export default Products;