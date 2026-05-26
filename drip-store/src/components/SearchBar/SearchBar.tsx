import { useState, useEffect } from 'react';
import { useNavigate }         from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db }    from '../../firebase/config';
import Trie      from '../../structures/Trie';
import type { Product } from '../../types';
import styles    from './SearchBar.module.scss';

const trie = new Trie();
let trieBuilt = false;

interface Props { onClose: () => void; }

const SearchBar = ({ onClose }: Props) => {
  const [query,       setQuery]       = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (trieBuilt) return;
    const load = async () => {
      const snap = await getDocs(collection(db, 'products'));
      const products = snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      setAllProducts(products);
      products.forEach(p => trie.insert(p.name, p.id));
      trieBuilt = true;
    };
    load();
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (!value.trim()) { setSuggestions([]); return; }
    const ids = trie.search(value);
    const found = allProducts.filter(p => ids.includes(p.id)).slice(0, 5);
    setSuggestions(found);
  };

  const handleSelect = (product: Product) => {
    navigate(`/shop?search=${product.name}`);
    onClose();
  };

  return (
    <div className={styles.wrap}>
      <input
        autoFocus
        className={styles.input}
        placeholder="Search products..."
        value={query}
        onChange={e => handleChange(e.target.value)}
      />
      <button onClick={onClose} className={styles.close}>✕</button>

      {suggestions.length > 0 && (
        <ul className={styles.dropdown}>
          {suggestions.map(p => (
            <li key={p.id} onClick={() => handleSelect(p)} className={styles.item}>
              <img src={p.image} alt={p.name} className={styles.thumb} />
              <div>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.price}>${p.price}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;