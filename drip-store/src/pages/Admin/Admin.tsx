import { useState, useEffect }                        from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db }                                          from '../../firebase/config';
import { useAuth }                                     from '../../context/AuthContext';
import { formatPrice, formatDate }                     from '../../helpers/formatters';
import type { Product }                                from '../../types';
import styles from './Admin.module.scss';

const Admin = () => {
  const { user, logout }              = useAuth();
  const [products, setProducts]       = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [showForm, setShowForm]       = useState(false);
  const [newProduct, setNewProduct]   = useState({
    name: '', price: '', category: 'Tops', image: '', stock: '', badge: '',
  });

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, 'products'));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'products'), {
      ...newProduct,
      price:      Number(newProduct.price),
      stock:      Number(newProduct.stock),
      rating:     0,
      reviews:    0,
      status:     'ACTIVE',
      tags:       [newProduct.category.toLowerCase()],
    });
    setShowForm(false);
    setNewProduct({ name: '', price: '', category: 'Tops', image: '', stock: '', badge: '' });
    loadProducts();
  };

  const stats = [
    { label: 'TOTAL REVENUE',     value: formatPrice(products.reduce((s, p) => s + p.price * (p.reviews || 0), 0)) },
    { label: 'ORDERS',            value: products.reduce((s, p) => s + (p.reviews || 0), 0).toLocaleString() },
    { label: 'CUSTOMERS',         value: '9,031' },
    { label: 'AVG. ORDER VALUE',  value: '$87.40' },
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>
            <span className={styles.logo}>DRIP</span>
            <span className={styles.panel}>ADMIN PANEL</span>
          </div>
          <nav className={styles.nav}>
            {['Dashboard', 'Products', 'Orders', 'Customers', 'Settings'].map(item => (
              <button key={item} className={`${styles.navItem} ${item === 'Dashboard' ? styles.navActive : ''}`}>
                {item}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={logout} className={styles.backBtn}>→ Back to Store</button>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.heading}>Dashboard</h1>
            <p className={styles.date}>{formatDate(new Date())}</p>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user?.displayName?.charAt(0).toUpperCase()}</div>
            <div>
              <p className={styles.userName}>{user?.displayName}</p>
              <p className={styles.userRole}>Administrator</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map(s => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statValue}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Products table */}
        <div className={styles.tableWrap}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Products</h2>
            <button onClick={() => setShowForm(s => !s)} className={styles.addBtn}>
              + ADD PRODUCT
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAdd} className={styles.form}>
              {[
                { label: 'Name',     key: 'name',     type: 'text' },
                { label: 'Price',    key: 'price',    type: 'number' },
                { label: 'Stock',    key: 'stock',    type: 'number' },
                { label: 'Image URL',key: 'image',    type: 'text' },
              ].map(f => (
                <input
                  key={f.key}
                  type={f.type}
                  placeholder={f.label}
                  className={styles.formInput}
                  value={(newProduct as Record<string, string>)[f.key]}
                  onChange={e => setNewProduct(p => ({ ...p, [f.key]: e.target.value }))}
                  required
                />
              ))}
              <select
                className={styles.formInput}
                value={newProduct.category}
                onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}
              >
                {['Tops', 'Bottoms', 'Outerwear', 'Accessories'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                className={styles.formInput}
                value={newProduct.badge}
                onChange={e => setNewProduct(p => ({ ...p, badge: e.target.value }))}
              >
                <option value="">No badge</option>
                <option value="NEW">NEW</option>
                <option value="BESTSELLER">BESTSELLER</option>
                <option value="SALE">SALE</option>
              </select>
              <button type="submit" className={styles.addBtn}>SAVE PRODUCT</button>
            </form>
          )}

          {loading ? (
            <p className={styles.loading}>Loading products...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  {['PRODUCT', 'CATEGORY', 'PRICE', 'STOCK', 'STATUS', 'ACTIONS'].map(h => (
                    <th key={h} className={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.productCell}>
                        <img src={p.image} alt={p.name} className={styles.productImg} />
                        <div>
                          <p className={styles.productName}>{p.name}</p>
                          {p.badge && <span className={styles.badge}>{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>{p.category}</td>
                    <td className={styles.td}>{formatPrice(p.price)}</td>
                    <td className={styles.td}>{p.stock}</td>
                    <td className={styles.td}>
                      <span className={styles.status}>{p.status}</span>
                    </td>
                    <td className={styles.td}>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className={styles.deleteBtn}
                        aria-label="Delete"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;