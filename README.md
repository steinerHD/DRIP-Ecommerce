# DRIP Store — Plataforma E-Commerce de Ropa

Proyecto final de la asignatura Estructuras de Datos y Algoritmos 2.
Universidad Autónoma de Occidente — Programa Informática — 2026-1

---

## Integrantes

| Nombre | Código |
|---|---|
| Steiner Herrera Mosquera | 2236793 |

---

## Enlaces

| Recurso | Enlace |
|---|---|
| Repositorio GitHub | https://github.com/steinerHD/DRIP-Ecommerce |
| Propuesta gráfica Figma | https://mode-lively-81297893.figma.site/ |
| Despliegue Netlify | (agregar enlace después del deploy) |

---

## Descripción del proyecto

DRIP Store es una tienda de ropa construida con React, TypeScript y Firebase. El sistema permite a los usuarios explorar un catálogo de productos, buscar por prefijo, gestionar un carrito de compras con soporte de deshacer, y recibir notificaciones en tiempo real. Los administradores cuentan con un panel privado para gestionar el inventario.

---

## Estructuras de datos implementadas

### 1. Lista Enlazada — `src/structures/LinkedList.ts`
Almacena el historial de productos vistos recientemente. Cada nuevo producto se inserta al inicio en O(1) y la lista se limita a 6 elementos automáticamente.

### 2. Pila (Stack) — `src/structures/Stack.ts`
Guarda el estado anterior del carrito antes de cada modificación. Al llamar "deshacer", se recupera el último estado con pop(), siguiendo la política LIFO.

### 3. Cola (Queue) — `src/structures/Queue.ts`
Gestiona el sistema de notificaciones del usuario. Las notificaciones se encolan y desencolan en orden cronológico siguiendo la política FIFO.

### 4. Trie — `src/structures/Trie.ts`
Almacena los nombres de todos los productos para el buscador con autocompletado. La búsqueda por prefijo es O(m) donde m es la longitud del prefijo, independiente del número de productos.

### 5. Grafo — `src/structures/Graph.ts`
Modela relaciones entre productos mediante un grafo no dirigido. Se conectan productos que comparten categoría o tags, permitiendo mostrar recomendaciones relevantes en el detalle de cada producto.

---

## Tecnologías utilizadas

- React 18 + TypeScript 5
- Vite 5
- Firebase Authentication (Email/Password y Google)
- Firestore Database
- React Router 6
- SCSS Modules
- Netlify (despliegue)

---

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/steinerHD/DRIP-Ecommerce.git
cd drip-store

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env en la raíz con las variables de Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# 4. Poblar Firestore (solo la primera vez)
node seed.mjs

# 5. Correr en desarrollo
npm run dev
```

src/
├── routes/          # AppRoutes, UserRoutes, AdminRoutes
├── context/         # AuthContext, CartContext
├── hooks/           # useProducts
├── structures/      # LinkedList, Stack, Queue, Trie, Graph
├── firebase/        # Configuración de Firebase
├── components/      # Navbar, Ticker, Footer, SearchBar, ProductCard
├── pages/           # Home, Shop, Login, Register, Cart, Admin
├── helpers/         # formatPrice, formatDate, slugify
├── types/           # Interfaces TypeScript
└── styles/          # Variables y estilos globales SCSS

---

## Documentación

El documento final con el alcance del sistema, tecnologías utilizadas y justificación de las estructuras de datos se encuentra en el archivo `Documentacion_DRIP_EstructurasDatos2.pdf` en la raíz del repositorio.
---

## Estructura del proyecto
