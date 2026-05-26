import { useNavigate }    from 'react-router-dom';
import Navbar             from '../../components/shared/Navbar/Navbar';
import Footer             from '../../components/shared/Footer/Footer';
import { useCart }        from '../../context/CartContext';
import { formatPrice }    from '../../helpers/formatters';
import styles from './Cart.module.scss';

const Cart = () => {
  const { items, removeFromCart, undoLast, clearCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your Cart</h1>
            <div className={styles.headerActions}>
              <button onClick={undoLast}   className={styles.undoBtn}>↩ Undo</button>
              <button onClick={clearCart}  className={styles.clearBtn}>Clear all</button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className={styles.empty}>
              <p>Your cart is empty.</p>
              <button onClick={() => navigate('/shop')} className={styles.shopBtn}>
                CONTINUE SHOPPING →
              </button>
            </div>
          ) : (
            <div className={styles.items}>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className={styles.item}>
                  <img src={product.image} alt={product.name} className={styles.image} />
                  <div className={styles.info}>
                    <span className={styles.category}>{product.category.toUpperCase()}</span>
                    <h3 className={styles.name}>{product.name}</h3>
                    <span className={styles.qty}>Qty: {quantity}</span>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.price}>{formatPrice(product.price * quantity)}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{total >= 150 ? 'FREE' : '$9.99'}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{formatPrice(total >= 150 ? total : total + 9.99)}</span>
            </div>
            <button className={styles.checkoutBtn}>CHECKOUT →</button>
            <p className={styles.shipping}>
              {total >= 150 ? '✓ Free shipping applied' : `Add ${formatPrice(150 - total)} more for free shipping`}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;