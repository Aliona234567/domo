import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const najati = () => {
    dispatch(addToCart(product));
    alert('✅ Товар добавлен в корзину');
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          className="product-image"
        />
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">${product.price}</div>
        <p className="product-description">
          {product.description}
        </p>
      </div>

      <div className="product-actions">
        <button 
          className="product-button"
          onClick={najati}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;