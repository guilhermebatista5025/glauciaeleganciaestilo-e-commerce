import React, { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Products from './components/Products';
import About from './components/About';
import Testimonials from './components/Testimonials';
import BrandsCarousel from './components/BrandsCarousel';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import CheckoutModal from './components/CheckoutModal';
import ProductModal from './components/ProductModal';
import Shop from './components/Shop';
import LoginPage from './components/LoginPage';

function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('@glaucia/hasVisited');
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Navigation Routing States
  const [currentPage, setCurrentPage] = useState('home');
  const [shopFilters, setShopFilters] = useState(null);

  // Authentication States
  const [user, setUser] = useState(null);

  // Load User session
  useEffect(() => {
    const savedUser = localStorage.getItem('@glaucia/user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('@glaucia/user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('@glaucia/user');
    navigateTo('home');
  };

  // Load from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('@glaucia/cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));

    const savedWishlist = localStorage.getItem('@glaucia/wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('@glaucia/cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('@glaucia/wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Centralized page navigator with anchor scrolling
  const navigateTo = (page, filters = null) => {
    setCurrentPage(page);
    setShopFilters(filters);
    
    const targetAnchor = filters?.anchor;
    
    if (page === 'home') {
      if (targetAnchor) {
        setTimeout(() => {
          const element = document.querySelector(targetAnchor);
          if (element) {
            if (window.lenis) {
              window.lenis.scrollTo(element, { duration: 1.2 });
            } else {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 150);
      } else {
        setTimeout(() => {
          if (window.lenis) {
            window.lenis.scrollTo(0, { duration: 0.8 });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      }
    } else if (page === 'shop' || page === 'login') {
      setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0 });
        }
      }, 50);
    }
  };

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    if (window.Lenis && !loading) {
      const lenis = new window.Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });

      // Bind to window for external scroll targets
      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      
      return () => {
        lenis.destroy();
        window.lenis = null;
      };
    }
  }, [loading]);

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleWishlistSidebar = () => setWishlistOpen(!wishlistOpen);
  const toggleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(!checkoutOpen);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (product, quantity = 1, size = 'M', color = '#000') => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity, size, color, cartId: Date.now() }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: newQ > 0 ? newQ : 1 };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={() => {
        setLoading(false);
        sessionStorage.setItem('@glaucia/hasVisited', 'true');
      }} />}
      
      {!loading && (
        <>
          {currentPage !== 'login' && (
            <>
              <Header 
                toggleCart={toggleCart} 
                toggleWishlistSidebar={toggleWishlistSidebar}
                cartCount={cartItems.length} 
                wishlistCount={wishlist.length} 
                openProductModal={setSelectedProduct}
                navigateTo={navigateTo}
                currentPage={currentPage}
                user={user}
                handleLogout={handleLogout}
              />
              <WishlistSidebar
                isOpen={wishlistOpen}
                toggleWishlistSidebar={toggleWishlistSidebar}
                items={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
              <CartSidebar 
                isOpen={cartOpen} 
                toggleCart={toggleCart} 
                items={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                openCheckout={toggleCheckout}
              />
            </>
          )}
          
          <main>
            {currentPage === 'home' ? (
              <>
                <Hero />
                <Collections />
                <Products 
                  openModal={setSelectedProduct} 
                  toggleWishlist={toggleWishlist} 
                  wishlist={wishlist}
                  navigateTo={navigateTo}
                />
                <About />
                <Testimonials />
                <BrandsCarousel />
              </>
            ) : currentPage === 'shop' ? (
              <Shop 
                openModal={setSelectedProduct} 
                toggleWishlist={toggleWishlist} 
                wishlist={wishlist} 
                initialFilters={shopFilters}
              />
            ) : currentPage === 'login' ? (
              <LoginPage 
                onLoginSuccess={handleLoginSuccess}
                navigateTo={navigateTo}
              />
            ) : null}
          </main>
          
          {currentPage !== 'login' && <Footer />}

          {/* Modals */}
          <ProductModal 
            product={selectedProduct} 
            isOpen={!!selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            addToCart={addToCart} 
            setSelectedProduct={setSelectedProduct}
          />
          
          <CheckoutModal 
            isOpen={checkoutOpen} 
            onClose={() => setCheckoutOpen(false)} 
            cartItems={cartItems} 
            clearCart={clearCart}
          />
        </>
      )}
    </>
  );
}

export default App;
