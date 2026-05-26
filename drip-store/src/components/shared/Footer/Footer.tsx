import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.top}>
      <div className={styles.brand}>
        <span className={styles.logo}>DRIP</span>
        <p>Made to move. Built to last.</p>
      </div>
      <div className={styles.cols}>
        <div className={styles.col}>
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          <Link to="/shop?filter=new">New Arrivals</Link>
          <Link to="/shop?filter=sale">Sale</Link>
        </div>
        <div className={styles.col}>
          <h4>Help</h4>
          <a href="#">Shipping & Returns</a>
          <a href="#">Size Guide</a>
          <a href="#">Contact Us</a>
        </div>
        <div className={styles.col}>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Sustainability</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
    <div className={styles.bottom}>
      <span>© 2025 DRIP. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;