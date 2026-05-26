import Navbar      from '../../components/shared/Navbar/Navbar';
import Ticker      from '../../components/shared/Ticker/Ticker';
import Footer      from '../../components/shared/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import styles from './Home.module.scss';

const Home = () => {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroSub}>SPRING / SUMMER 2025</p>
          <h1 className={styles.heroTitle}>MADE<br />TO MOVE.</h1>
          <div className={styles.heroBtns}>
            <a href="/shop" className={styles.btnPrimary}>SHOP COLLECTION →</a>
            <a href="/shop?filter=new" className={styles.btnSecondary}>NEW ARRIVALS</a>
          </div>
        </div>
        <p className={styles.scrollHint}>SCROLL TO EXPLORE</p>
      </section>

      <Ticker />

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <a href="/shop" className={styles.viewAll}>VIEW ALL →</a>
        </div>

        {loading ? (
          <div className={styles.grid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner strip */}
      <section className={styles.banner}>
        <div className={styles.bannerText}>
          <h2>NEW SEASON.<br />NEW YOU.</h2>
          <a href="/shop?filter=new" className={styles.btnPrimary}>EXPLORE NOW →</a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;