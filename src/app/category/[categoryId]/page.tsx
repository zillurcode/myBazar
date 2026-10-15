'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CategoryCard from '@/app/component/CategoryCard';
import { useParams } from 'next/navigation';

interface Product {
  id: string | number;
  category?: string;
  categorySlug?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image?: string;
  today?: number;
  [key: string]: any; 
}

export default function CategoryDetailsPage() {
  const params = useParams();
  const categoryId = params?.categoryId as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryTitle, setCategoryTitle] = useState<string>(categoryId || '');
  const [categoryIcon, setCategoryIcon] = useState<string>('🍚');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'lowest' | 'highest'>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!categoryId) return;

    async function fetchProducts() {
      try {
        const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
          cache: 'no-store',
        });

        if (!res.ok) return;

        const allProducts = await res.json();

        const productList: Product[] = Array.isArray(allProducts)
          ? allProducts
          : allProducts?.data || allProducts?.products || [];

        const targetId = categoryId.trim().toLowerCase();

        const matched = productList.filter((item: Product) => {
          const itemCat = String(item.category || '').trim().toLowerCase();
          const itemSlug = String(item.categorySlug || '').trim().toLowerCase();
          return itemCat === targetId || itemSlug === targetId;
        });

        if (matched.length > 0) {
          const first = matched[0];

          if (first.categoryNameBn) {
            setCategoryTitle(first.categoryNameBn);
          }

          if (first.categoryIcon || first.image) {
            setCategoryIcon(first.categoryIcon || first.image || '');
          }
        }

        setProducts(matched);
        setFilteredProducts(matched);
      } catch (error) {
        console.error('Category Products Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'all' | 'lowest' | 'highest';
    setSelectedFilter(value);

    if (value === 'all') {
      setFilteredProducts(products);
      return;
    }

    const sorted = [...products].sort((a, b) => (a.today || 0) - (b.today || 0));

    if (value === 'lowest') {
      setFilteredProducts(sorted.length ? [sorted[0]] : []);
    } else if (value === 'highest') {
      setFilteredProducts(sorted.length ? [sorted[sorted.length - 1]] : []);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-500 text-lg font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 bg-[#F8F9FA] min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl border border-gray-100 shadow-sm">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{categoryTitle}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {filteredProducts.length}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200 hidden sm:block"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">ফিল্টার অপশন</span>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">দেখুন:</span>

          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">সবগুলো দেখান</option>
            <option value="lowest">শুধুমাত্র সর্বনিম্ন দামের কার্ডটি</option>
            <option value="highest">শুধুমাত্র সর্বোচ্চ দামের কার্ডটি</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <CategoryCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg font-semibold">এই শর্তে কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      )}
    </main>
  );
}
