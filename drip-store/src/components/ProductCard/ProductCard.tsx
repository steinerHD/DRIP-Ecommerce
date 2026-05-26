import { useState } from 'react';
import { useCart }  from '../../context/CartContext';
import type { Product }  from '../../types';
import { formatPrice } from '../../helpers/formatters';
import styles from './ProductCard.module.scss';

interface Props { product: Product; }

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.name} className={styles.image} />
        {product.badge && (
          <span className={styles.badge}>{product.badge}</span>
        )}
        {hovered && (
          <button
            className={styles.quickAdd}
            onClick={() => addToCart(product)}
          >
            QUICK ADD
          </button>
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.category}>{product.category.toUpperCase()}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < Math.round(product.rating) ? styles.starFilled : styles.star}>★</span>
          ))}
          <span className={styles.reviews}>({product.reviews})</span>
        </div>
        <span className={styles.price}>{formatPrice(product.price)}</span>
      </div>
    </div>
  );
};

export default ProductCard;