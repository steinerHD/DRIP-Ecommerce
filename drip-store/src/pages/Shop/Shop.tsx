import { useState, useEffect }  from 'react';
import { useSearchParams }      from 'react-router-dom';
import Navbar                   from '../../components/shared/Navbar/Navbar';
import Footer                   from '../../components/shared/Footer/Footer';
import ProductCard              from '../../components/ProductCard/ProductCard';
import { useProducts }          from '../../hooks/useProducts';
import type { Product }         from '../../types';
import styles from './Shop.module.scss';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];

const Shop = () => {
  const { products, loading }       = useProducts();
  const [searchParams]              = useSearchParams();
  const [category, setCategory]     = useState('All');
  const [maxPrice, setMaxPrice]     = useState(500);
  const [filtered, setFiltered]     = useState<Product[]>([]);

  useEffect(() => {
    let result = [...products];

    const filter = searchParams.get('filter');
    const search = searchParams.get('search');

    if (filter === 'new')  result = result.filter(p => p.badge === 'NEW');
    if (filter === 'sale') result = result.filter(p => p.badge === 'SALE');
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') result = result.filter(p => p.category === category);
    result = result.filter(p => p.price <= maxPrice);

    setFiltered(result);
  }, [products, category, maxPrice, searchParams]);

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>CATEGORY</h3>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${category === cat ? styles.active : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>MAX PRICE</h3>
            <input
              type="range"
              min={0}
              max={500}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className={styles.range}
            />
            <span className={styles.priceLabel}>Up to ${maxPrice}</span>
          </div>
        </aside>

        {/* Grid */}
        <main className={styles.main}>
          <div className={styles.topBar}>
            <h2 className={styles.heading}>
              {category === 'All' ? 'All Products' : category}
            </h2>
            <span className={styles.count}>{filtered.length} products</span>
          </div>

          {loading ? (
            <div className={styles.grid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className={styles.empty}>No products found.</p>
          ) : (
            <div className={styles.grid}>
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;