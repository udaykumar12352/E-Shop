import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  position: relative;
  &:hover .zoom {
    transform: scale(1.5);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  transition: transform 0.3s;
`;

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const id_need= parseInt(id)
  // Mock product data - replace with actual API call
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
  const product = products.find(item => item.id === id_need);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  return (
    <ProductContainer>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} className="zoom" />
      </ImageContainer>

      <div>
        <h1>{product.name}</h1>
        <p>${product.price}</p>
        <p>{product.description}</p>

        <div>
          <label>Quantity: </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleAddToWishlist}>Add to Wishlist</button>
      </div>
    </ProductContainer>
  );
}

export default ProductDetails;