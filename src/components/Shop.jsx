import React, { useState, useEffect, useRef } from 'react';
import { productsData } from '../data/products';

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "var(--color-gold-primary)" : "none"} stroke="var(--color-white-soft)" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-white-soft)" strokeWidth="1.8" style={{ marginRight: '10px' }}>
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const Shop = ({ openModal, toggleWishlist, wishlist, initialFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(600);
  const [sortBy, setSortBy] = useState('recomendados');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const gridRef = useRef(null);

  // Active filters criteria
  const hasActiveFilters = selectedCategory !== 'TODOS' || selectedTypes.length > 0 || searchTerm.trim() !== '' || maxPrice < 600;

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'TODOS') count++;
    count += selectedTypes.length;
    if (searchTerm.trim() !== '') count++;
    if (maxPrice < 600) count++;
    return count;
  };
  const activeFiltersCount = getActiveFiltersCount();

  // Sync initial filters when component mounts or initialFilters changes
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.category) {
        setSelectedCategory(initialFilters.category.toUpperCase());
      }
      if (initialFilters.type) {
        setSelectedTypes([initialFilters.type.toUpperCase()]);
      }
      if (initialFilters.search) {
        setSearchTerm(initialFilters.search);
      }
    }
  }, [initialFilters]);

  // Types list available in database
  const availableTypes = ['VESTIDOS', 'SAIAS', 'CONJUNTOS', 'CAMISAS', 'BLAZERS'];

  // Toggle Type Selection
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('TODOS');
    setSelectedTypes([]);
    setMaxPrice(600);
    setSortBy('recomendados');
  };

  // Filter and Sort Logic
  const getFilteredProducts = () => {
    let result = [...productsData];

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategory !== 'TODOS') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Types filter
    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(p.type));
    }

    // Price filter
    result = result.filter(p => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'preco-crescente') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'preco-decrescente') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'melhor-avaliados') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const filteredProducts = getFilteredProducts();

  // GSAP Entrance/Filtering Animation
  useEffect(() => {
    if (window.gsap && gridRef.current) {
      const cards = gridRef.current.children;
      if (cards.length > 0) {
        window.gsap.killTweensOf(cards);
        window.gsap.fromTo(cards, 
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }
  }, [searchTerm, selectedCategory, selectedTypes, maxPrice, sortBy]);

  return (
    <div className="typ-storefront">
      <style>
        {`
          .typ-storefront {
            background-color: var(--color-bg-main);
            color: var(--color-white-soft);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            padding-top: 140px;
            padding-bottom: 80px;
            box-sizing: border-box;
          }

          .shop-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 5%;
          }
          
          .shop-header-banner {
            text-align: center;
            margin-bottom: 50px;
            padding: 40px 0;
            background-color: rgba(200, 155, 90, 0.03);
            border-bottom: 1px solid rgba(200, 155, 90, 0.15);
          }

          .shop-header-banner p {
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--color-gold-light);
            margin-bottom: 12px;
          }

          .shop-header-banner h1 {
            font-family: 'Bricolage Grotesque', sans-serif;
            font-size: 44px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: var(--color-white-soft);
            text-transform: uppercase;
          }

          .shop-layout {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 50px;
          }

          /* Filter Sidebar */
          .shop-sidebar {
            background-color: rgba(245, 240, 232, 0.02);
            border: 1px solid rgba(200, 155, 90, 0.2);
            border-radius: 0px;
            padding: 30px;
            height: fit-content;
            position: sticky;
            top: 100px;
          }

          .filter-group {
            margin-bottom: 35px;
            padding-bottom: 25px;
            border-bottom: 1px solid rgba(200, 155, 90, 0.15);
          }

          .filter-group:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .filter-title {
            font-family: 'Bricolage Grotesque', sans-serif;
            font-size: 13px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--color-white-soft);
            margin-bottom: 20px;
            font-weight: 700;
          }

          .search-input-wrapper {
            display: flex;
            align-items: center;
            background-color: rgba(245, 240, 232, 0.03);
            border: 1.5px solid rgba(200, 155, 90, 0.25);
            border-radius: 0px;
            padding: 10px 15px;
            transition: all 0.3s;
          }
          
          .search-input-wrapper:focus-within {
            border-color: var(--color-gold-primary);
            box-shadow: 0 0 0 3px rgba(200, 155, 90, 0.15);
          }

          .search-input-wrapper input {
            background: none;
            border: none;
            color: var(--color-white-soft);
            width: 100%;
            outline: none;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
          }

          .category-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .category-btn {
            text-align: left;
            padding: 10px 15px;
            font-size: 12px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: rgba(245, 240, 232, 0.5);
            background-color: transparent;
            transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border-left: 2px solid transparent;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
          }

          .category-btn.active {
            color: var(--color-gold-primary);
            font-weight: 700;
            border-left-color: var(--color-gold-primary);
            padding-left: 20px;
            background-color: rgba(200, 155, 90, 0.06);
          }

          .category-btn:hover {
            color: var(--color-gold-primary);
            background-color: rgba(200, 155, 90, 0.03);
          }

          /* Square Minimal Checkboxes */
          .hidden-checkbox {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }

          .checkbox-item {
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            cursor: pointer;
            font-size: 13px;
            color: rgba(245, 240, 232, 0.8);
            user-select: none;
            position: relative;
            padding-left: 28px;
            min-height: 24px;
            transition: color 0.2s;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
          }
          
          .checkbox-item:hover {
            color: var(--color-gold-primary);
          }

          .custom-checkbox {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
            border: 1.5px solid rgba(245, 240, 232, 0.3);
            border-radius: 0px;
            background-color: rgba(245, 240, 232, 0.02);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }

          .hidden-checkbox:checked + .custom-checkbox {
            background-color: var(--color-gold-primary);
            border-color: var(--color-gold-primary);
          }

          .hidden-checkbox:focus + .custom-checkbox {
            box-shadow: 0 0 0 2px rgba(200, 155, 90, 0.2);
          }

          .checkmark-svg {
            opacity: 0;
            transform: scale(0.6);
            transition: all 0.2s ease-in-out;
            color: var(--color-bg-main);
          }

          .hidden-checkbox:checked + .custom-checkbox .checkmark-svg {
            opacity: 1;
            transform: scale(1);
          }

          .price-slider-info {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: rgba(245, 240, 232, 0.8);
            margin-bottom: 12px;
            font-family: 'Inter', sans-serif;
          }

          /* Range Slider Minimal Style */
          .price-range-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 3px;
            background: rgba(200, 155, 90, 0.2);
            outline: none;
            margin: 15px 0;
            transition: background 0.3s;
          }
          
          .price-range-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--color-gold-primary);
            border: none;
            cursor: pointer;
            transition: transform 0.2s;
          }
          
          .price-range-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }
          
          .price-range-slider::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--color-gold-primary);
            border: none;
            cursor: pointer;
            transition: transform 0.2s;
          }
          
          .price-range-slider::-moz-range-thumb:hover {
            transform: scale(1.2);
          }

          .clear-filters-btn {
            width: 100%;
            padding: 12px;
            border: 1.5px solid var(--color-gold-primary);
            color: var(--color-gold-primary);
            background-color: transparent;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 700;
            border-radius: 100px;
            transition: all 0.3s;
            margin-top: 15px;
            font-family: 'Inter', sans-serif;
          }

          .clear-filters-btn:hover {
            background-color: var(--color-gold-primary);
            color: var(--color-bg-main);
          }

          /* Catalog Grid & Header */
          .catalog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(200, 155, 90, 0.2);
          }

          .catalog-info {
            font-size: 14px;
            color: rgba(245, 240, 232, 0.7);
            font-family: 'Inter', sans-serif;
          }

          .sort-dropdown {
            background-color: var(--color-bg-main);
            border: 1.5px solid rgba(245, 240, 232, 0.2);
            color: var(--color-white-soft);
            padding: 10px 15px;
            border-radius: 0px;
            font-size: 12px;
            font-weight: 600;
            outline: none;
            cursor: pointer;
            letter-spacing: 0.5px;
            transition: border-color 0.3s;
            font-family: 'Inter', sans-serif;
          }
          
          .sort-dropdown:focus {
            border-color: var(--color-gold-primary);
          }

          .shop-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
          }

          .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            background-color: rgba(200, 155, 90, 0.03);
            border: 1px solid rgba(200, 155, 90, 0.15);
            border-radius: 0px;
          }

          /* Active Filters Pills */
          .active-filters-pills {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
            margin-bottom: 25px;
            padding: 10px 0;
            animation: fadeIn 0.3s ease-out;
          }
          
          .active-filters-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: rgba(245, 240, 232, 0.6);
            margin-right: 5px;
            font-weight: 700;
          }
          
          .filter-pill {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: rgba(200, 155, 90, 0.08);
            border: 1px solid var(--color-gold-primary);
            padding: 6px 12px;
            border-radius: 100px;
            font-size: 11px;
            color: var(--color-white-soft);
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            transition: all 0.25s;
          }
          
          .filter-pill button {
            background: none;
            border: none;
            color: rgba(245, 240, 232, 0.6);
            cursor: pointer;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
          }
          
          .filter-pill button:hover {
            color: var(--color-gold-light);
          }
          
          .clear-all-pills-btn {
            background: none;
            border: none;
            color: rgba(245, 240, 232, 0.6);
            font-size: 11px;
            text-decoration: underline;
            cursor: pointer;
            padding: 5px 10px;
            transition: color 0.3s;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
          }
          
          .clear-all-pills-btn:hover {
            color: var(--color-gold-primary);
          }

          /* Mobile Filter Bar */
          .mobile-filter-bar {
            display: none;
            margin-bottom: 25px;
          }
          
          .mobile-filter-toggle {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 48px;
            background-color: var(--color-bg-main);
            border: 1.5px solid rgba(245, 240, 232, 0.2);
            color: var(--color-white-soft);
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 700;
            border-radius: 100px;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
            font-family: 'Inter', sans-serif;
          }
          
          .mobile-filter-toggle.active {
            background-color: var(--color-gold-primary);
            color: var(--color-bg-main);
          }
          
          .mobile-filter-badge {
            position: absolute;
            right: 15px;
            background-color: var(--color-gold-primary);
            color: var(--color-white-soft);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            font-size: 10px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .mobile-filter-toggle.active .mobile-filter-badge {
            background-color: var(--color-white-soft);
            color: var(--color-black-premium);
          }

          /* Product Cards Streetwear */
          .product-card {
            cursor: pointer;
            background-color: rgba(245, 240, 232, 0.02);
            border: 1px solid rgba(245, 240, 232, 0.05);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            padding: 10px;
          }

          .product-card:hover {
            border-color: rgba(200, 155, 90, 0.35);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          }

          .product-img-container {
            position: relative;
            aspect-ratio: 1/1;
            background-color: rgba(245, 240, 232, 0.01);
            margin-bottom: 20px;
            overflow: hidden;
          }

          .product-img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
          }

          .product-card:hover .product-img-container img {
            transform: scale(1.06);
          }

          .product-wishlist {
            position: absolute;
            top: 15px;
            right: 15px;
            background-color: rgba(46, 41, 38, 0.9);
            border: 1px solid rgba(245, 240, 232, 0.15);
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2;
            transition: all 0.2s;
          }

          .product-wishlist:hover {
            background-color: rgba(46, 41, 38, 1);
            transform: scale(1.1);
          }

          .product-add-btn {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translate(-50%, 100%);
            width: auto;
            padding: 10px 24px;
            background-color: var(--color-gold-primary);
            color: var(--color-white-soft);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            text-align: center;
            border-radius: 100px;
            border: none;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 0;
            white-space: nowrap;
            z-index: 3;
          }

          .product-card:hover .product-add-btn {
            transform: translate(-50%, 0);
            opacity: 1;
          }

          .product-card:hover .product-add-btn:hover {
            background-color: var(--color-gold-light);
          }

          /* Responsive Breakpoints */
          @media (max-width: 1100px) {
            .shop-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 900px) {
            .mobile-filter-bar {
              display: block;
            }
            .shop-layout {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .shop-sidebar {
              position: static;
              width: 100%;
              margin-bottom: 20px;
              display: none;
              animation: slideDown 0.3s ease-out forwards;
              opacity: 0;
            }
            .shop-sidebar.show {
              display: block;
              opacity: 1;
            }
          }

          @media (max-width: 600px) {
            .shop-grid {
              grid-template-columns: 1fr;
            }
            .catalog-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 15px;
            }
            .shop-header-banner h1 {
              font-size: 32px;
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      
      <div className="shop-container">
        
        {/* Banner Superior Minimalista */}
        <div className="shop-header-banner">
          <p>Coleções Premium de Alta Costura</p>
          <h1>Ateliê Gláucia</h1>
        </div>

        {/* Toggle de Filtros Mobile */}
        <div className="mobile-filter-bar">
          <button 
            className={`mobile-filter-toggle ${showMobileFilters ? 'active' : ''}`}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            aria-expanded={showMobileFilters}
            aria-label="Alternar painel de filtros"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '10px' }}>
              <line x1="4" y1="21" x2="4" y2="14"/>
              <line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/>
              <line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="1" y1="14" x2="7" y2="14"/>
              <line x1="9" y1="8" x2="15" y2="8"/>
              <line x1="17" y1="16" x2="23" y2="16"/>
            </svg>
            <span>{showMobileFilters ? 'Ocultar Filtros' : 'Filtrar & Ordenar'}</span>
            {activeFiltersCount > 0 && (
              <span className="mobile-filter-badge">{activeFiltersCount}</span>
            )}
          </button>
        </div>

        <div className="shop-layout">
          
          {/* Sidebar de Filtros */}
          <aside className={`shop-sidebar ${showMobileFilters ? 'show' : ''}`}>
            
            {/* Busca por Nome */}
            <div className="filter-group">
              <h3 className="filter-title">Buscar Peça</h3>
              <div className="search-input-wrapper">
                <SearchIcon />
                <input 
                  type="text" 
                  placeholder="Nome, tipo..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-white-soft)',
                      cursor: 'pointer',
                      padding: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="clear-search-btn"
                    aria-label="Limpar busca"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Categorias */}
            <div className="filter-group">
              <h3 className="filter-title">Categoria</h3>
              <div className="category-buttons">
                {['TODOS', 'FEMININO', 'MASCULINO'].map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'TODOS' ? 'Todos os Gêneros' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo de Peça */}
            <div className="filter-group">
              <h3 className="filter-title">Tipo de Peça</h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {availableTypes.map(type => (
                  <label key={type} className="checkbox-item">
                    <input 
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="hidden-checkbox"
                    />
                    <span className="custom-checkbox">
                      <svg width="10" height="8" viewBox="0 0 12 9" fill="none" stroke="currentColor" strokeWidth="2.5" className="checkmark-svg">
                        <polyline points="1 4.5 4 7.5 11 1" />
                      </svg>
                    </span>
                    <span className="checkbox-label-text">
                      {type.charAt(0) + type.slice(1).toLowerCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Faixa de Preço */}
            <div className="filter-group">
              <h3 className="filter-title">Preço Máximo</h3>
              <div className="price-slider-info">
                <span>R$ 150</span>
                <span style={{ fontWeight: '700', color: 'var(--color-gold-primary)' }}>R$ {maxPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <input 
                type="range"
                min="150"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range-slider"
              />
            </div>

            {/* Botão de Limpar Filtros */}
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Limpar Filtros
            </button>
          </aside>

          {/* Grid de Catálogo */}
          <main>
            
            {/* Header da Grade */}
            <div className="catalog-header">
              <div className="catalog-info">
                Mostrando <span style={{ fontWeight: 'bold', color: 'var(--color-white-soft)' }}>{filteredProducts.length}</span> de <span>{productsData.length}</span> produtos
              </div>
              
              <select 
                className="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recomendados">Recomendados</option>
                <option value="preco-crescente">Preço: Menor para Maior</option>
                <option value="preco-decrescente">Preço: Maior para Menor</option>
                <option value="melhor-avaliados">Melhor Avaliados</option>
              </select>
            </div>

            {/* Pílulas de Filtros Ativos */}
            {hasActiveFilters && (
              <div className="active-filters-pills">
                <span className="active-filters-label">Filtros:</span>
                
                {selectedCategory !== 'TODOS' && (
                  <div className="filter-pill">
                    <span>Gênero: {selectedCategory.charAt(0) + selectedCategory.slice(1).toLowerCase()}</span>
                    <button onClick={() => setSelectedCategory('TODOS')} aria-label="Remover filtro de gênero">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                )}
                
                {selectedTypes.map(type => (
                  <div className="filter-pill" key={type}>
                    <span>{type.charAt(0) + type.slice(1).toLowerCase()}</span>
                    <button onClick={() => handleTypeToggle(type)} aria-label={`Remover filtro de ${type}`}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))}
                
                {searchTerm.trim() !== '' && (
                  <div className="filter-pill">
                    <span>Busca: "{searchTerm}"</span>
                    <button onClick={() => setSearchTerm('')} aria-label="Remover filtro de busca">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                )}
                
                {maxPrice < 600 && (
                  <div className="filter-pill">
                    <span>Até R$ {maxPrice}</span>
                    <button onClick={() => setMaxPrice(600)} aria-label="Remover filtro de preço máximo">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                )}
                
                <button className="clear-all-pills-btn" onClick={handleClearFilters}>
                  Limpar tudo
                </button>
              </div>
            )}

            {/* Grade Responsiva */}
            <div className="shop-grid" ref={gridRef}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => {
                  const isWished = wishlist && wishlist.some(w => w.id === product.id);
                  
                  return (
                    <div 
                      key={product.id} 
                      className="product-card" 
                      onClick={() => openModal(product)}
                    >
                      <div className="product-img-container">
                        <img src={product.image} alt={product.name} />
                        {product.isNew && (
                          <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            backgroundColor: 'var(--color-black-premium)',
                            color: 'var(--color-white-soft)',
                            padding: '4px 8px',
                            fontSize: '9px',
                            letterSpacing: '1px',
                            fontWeight: 'bold',
                            zIndex: 2
                          }}>
                            NOVO
                          </div>
                        )}
                        
                        <button 
                           className="product-wishlist"
                           style={{
                             transform: isWished ? 'scale(1.1)' : 'scale(1)'
                           }}
                           onClick={(e) => {
                             e.stopPropagation();
                             toggleWishlist(product);
                             if(window.gsap) {
                               window.gsap.fromTo(e.currentTarget, { scale: 0.8 }, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
                             }
                           }}
                        >
                          <HeartIcon filled={isWished} />
                        </button>

                        <button 
                          className="product-add-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(product);
                          }}
                        >
                          Ver Detalhes
                        </button>
                      </div>

                      <div style={{ textAlign: 'center', padding: '0 10px' }}>
                        <p style={{ fontSize: '10px', color: 'var(--color-gold-dark)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
                          ATELIÊ GLÁUCIA
                        </p>
                        <h3 style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--color-white-soft)', fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '-0.3px', lineHeight: '1.3' }}>
                          {product.name}
                        </h3>
                        <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-gold-dark)', fontFamily: "'Inter', sans-serif" }}>
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-results">
                  <p style={{ fontSize: '18px', color: 'var(--color-white-soft)', marginBottom: '10px', fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif" }}>Nenhum produto atende aos filtros</p>
                  <p style={{ color: '#666666', fontSize: '14px', marginBottom: '20px' }}>Tente ajustar os critérios de pesquisa ou limpar os filtros aplicados.</p>
                  <button 
                    onClick={handleClearFilters}
                    style={{
                      padding: '12px 24px',
                      border: '1.5px solid var(--color-gold-primary)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-gold-primary)',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontWeight: 700,
                      borderRadius: '100px'
                    }}
                  >
                    Mostrar Todos
                  </button>
                </div>
              )}
            </div>

          </main>

        </div>

      </div>

    </div>
  );
};

export default Shop;
