import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db }                  from '../firebase/config';
import type { Product }        from '../types';
import LinkedList              from '../structures/LinkedList';
import Graph                   from '../structures/Graph';

const recentlyViewed = new LinkedList<Product>(6);
const productGraph   = new Graph();

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, 'products'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      productGraph.buildFromProducts(data);
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  const viewProduct = (product: Product) => {
    recentlyViewed.prepend(product);
  };

  const getRelated = (productId: string): Product[] => {
    const relatedIds = productGraph.getRelated(productId);
    return products.filter(p => relatedIds.includes(p.id)).slice(0, 4);
  };

  const getRecentlyViewed = (): Product[] => recentlyViewed.toArray();

  return { products, loading, viewProduct, getRelated, getRecentlyViewed };
};