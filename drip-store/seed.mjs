import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            'AIzaSyBaIZqmi_Bbvt2YAcjsldxb2CJvdlyGcr0',
  authDomain:        'drip-store-69a3d.firebaseapp.com',
  projectId:         'drip-store-69a3d',
  storageBucket:     'drip-store-69a3d.firebasestorage.app',
  messagingSenderId: '1024331513458',
  appId:             '1:1024331513458:web:a9eacd19dd617121530ceb',
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const products = [
  {
    name:     'Minimal White Tee',
    price:    45,
    category: 'Tops',
    image:    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    badge:    'NEW',
    rating:   4,
    reviews:  142,
    stock:    84,
    status:   'ACTIVE',
    tags:     ['tops', 'casual', 'basic'],
  },
  {
    name:     'Charcoal Cargo Pants',
    price:    120,
    category: 'Bottoms',
    image:    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
    badge:    'BESTSELLER',
    rating:   4,
    reviews:  318,
    stock:    42,
    status:   'ACTIVE',
    tags:     ['bottoms', 'cargo', 'streetwear'],
  },
  {
    name:     'Oversized Denim Jacket',
    price:    185,
    category: 'Outerwear',
    image:    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600',
    badge:    null,
    rating:   5,
    reviews:  89,
    stock:    27,
    status:   'ACTIVE',
    tags:     ['outerwear', 'denim', 'casual'],
  },
  {
    name:     'Ribbed Knit Sweater',
    price:    95,
    category: 'Tops',
    image:    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600',
    badge:    'NEW',
    rating:   4,
    reviews:  63,
    stock:    55,
    status:   'ACTIVE',
    tags:     ['tops', 'knit', 'casual'],
  },
  {
    name:     'Black Slim Chinos',
    price:    89,
    category: 'Bottoms',
    image:    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    badge:    null,
    rating:   4,
    reviews:  210,
    stock:    60,
    status:   'ACTIVE',
    tags:     ['bottoms', 'chinos', 'formal'],
  },
  {
    name:     'Linen Shirt Cream',
    price:    75,
    category: 'Tops',
    image:    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
    badge:    'NEW',
    rating:   4,
    reviews:  47,
    stock:    70,
    status:   'ACTIVE',
    tags:     ['tops', 'linen', 'summer'],
  },
  {
    name:     'Puffer Vest Black',
    price:    130,
    category: 'Outerwear',
    image:    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    badge:    'SALE',
    rating:   4,
    reviews:  98,
    stock:    33,
    status:   'ACTIVE',
    tags:     ['outerwear', 'vest', 'winter'],
  },
  {
    name:     'Wide Leg Trousers',
    price:    110,
    category: 'Bottoms',
    image:    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
    badge:    null,
    rating:   5,
    reviews:  134,
    stock:    48,
    status:   'ACTIVE',
    tags:     ['bottoms', 'wide-leg', 'minimal'],
  },
  {
    name:     'Graphic Print Hoodie',
    price:    98,
    category: 'Tops',
    image:    'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600',
    badge:    'BESTSELLER',
    rating:   5,
    reviews:  276,
    stock:    91,
    status:   'ACTIVE',
    tags:     ['tops', 'hoodie', 'streetwear'],
  },
  {
    name:     'Trench Coat Beige',
    price:    220,
    category: 'Outerwear',
    image:    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
    badge:    'NEW',
    rating:   5,
    reviews:  52,
    stock:    20,
    status:   'ACTIVE',
    tags:     ['outerwear', 'trench', 'classic'],
  },
  {
    name:     'Canvas Tote Bag',
    price:    35,
    category: 'Accessories',
    image:    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600',
    badge:    null,
    rating:   4,
    reviews:  189,
    stock:    200,
    status:   'ACTIVE',
    tags:     ['accessories', 'bag', 'casual'],
  },
  {
    name:     'Leather Belt Brown',
    price:    45,
    category: 'Accessories',
    image:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    badge:    null,
    rating:   4,
    reviews:  95,
    stock:    110,
    status:   'ACTIVE',
    tags:     ['accessories', 'belt', 'leather'],
  },
];

const seed = async () => {
  console.log('Seeding products...');
  for (const product of products) {
    const ref = await addDoc(collection(db, 'products'), product);
    console.log(`Added: ${product.name} (${ref.id})`);
  }
  console.log('Done! All products added to Firestore.');
  process.exit(0);
};

seed().catch(err => {
  console.error('Error seeding:', err);
  process.exit(1);
});