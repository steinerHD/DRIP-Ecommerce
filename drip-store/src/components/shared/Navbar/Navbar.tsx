import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import SearchBar from '../../SearchBar/SearchBar';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { user, logout }    = useAuth();
  const { items }           = useCart();
  const navigate            = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>DRIP</Link>

      <ul className={styles.links}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/shop?filter=new">New Arrivals</Link></li>
        <li><Link to="/shop?filter=sale">Sale</Link></li>
      </ul>

      <div className={styles.actions}>
        <button onClick={() => setShowSearch(s => !s)} className={styles.iconBtn} aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        <Link to="/cart" className={styles.cartBtn} aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </Link>

        {user ? (
          <button onClick={handleLogout} className={styles.signInBtn}>Sign Out</button>
        ) : (
          <Link to="/login" className={styles.signInBtn}>Sign In</Link>
        )}

        {user?.role === 'admin' && (
          <Link to="/admin" className={styles.adminLink}>Admin</Link>
        )}
      </div>

      {showSearch && (
        <div className={styles.searchOverlay}>
          <SearchBar onClose={() => setShowSearch(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;