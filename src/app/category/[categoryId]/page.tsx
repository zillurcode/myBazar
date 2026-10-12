'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CategoryCard from '@/app/component/CategoryCard';
import { useParams } from 'next/navigation';

export default function CategoryDetailsPage() {
    const params = useParams();
    const categoryId = params?.categoryId as string;

    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [categoryTitle, setCategoryTitle] = useState(categoryId || '');
    const [categoryIcon, setCategoryIcon] = useState('🍚');
    const [selectedFilter, setSelectedFilter] = useState('all'); // সিলেকশন স্টেট
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!categoryId) return;

        async function fetchProducts() {
            try {
                const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
                    cache: 'no-store'
                });
                
                if (res.ok) {
                    const allProducts = await res.json();
                    const productList = Array.isArray(allProducts) 
                        ? allProducts 
                        : (allProducts?.data || allProducts?.products || []);
                    
                    const matched = productList.filter((item: any) =>  {
                        const itemCat = String(item.category || '').trim().toLowerCase();
                        const itemSlug = String(item.categorySlug || '').trim().toLowerCase();
                        const targetId = String(categoryId || '').trim().toLowerCase();

                        return itemCat === targetId || itemSlug === targetId;
                    });

                    if (matched.length > 0) {
                        if (matched[0].categoryNameBn) {
                            setCategoryTitle(matched[0].categoryNameBn);
                        }
                        if (matched[0].categoryIcon || matched[0].image) {
                            setCategoryIcon(matched[0].categoryIcon || matched[0].image);
                        }
                    }

                    setProducts(matched);
                    setFilteredProducts(matched);
                }
            } catch (error) {
                console.error("Category Products Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [categoryId]);

    // শুধুমাত্র সিলেক্ট করা কার্ড বা শর্ত অনুযায়ী ফিল্টার করার হ্যান্ডলার
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedFilter(value);

        if (value === 'all') {
            setFilteredProducts(products);
        } else if (value === 'lowest') {
            // যদি সবচেয়ে কম দামের একটিমাত্র বা নির্দিষ্ট কার্ড দেখাতে চান
            const lowestPriceProduct = [...products].sort((a, b) => (a.today || 0) - (b.today || 0))[0];
            setFilteredProducts(lowestPriceProduct ? [lowestPriceProduct] : []);
        } else if (value === 'highest') {
            // যদি সবচেয়ে বেশি দামের একটিমাত্র কার্ড দেখাতে চান
            const highestPriceProduct = [...products].sort((a, b) => (b.today || 0) - (a.today || 0))[0];
            setFilteredProducts(highestPriceProduct ? [highestPriceProduct] : []);
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
            {/* Top Header Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl border border-gray-100 shadow-sm">
                        {categoryIcon}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 capitalize">
                            {categoryTitle}
                        </h1>
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

            {/* Filter / Sorting Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">
                    ফিল্টার অপশন
                </span>
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

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((item, index) => (
                        <CategoryCard key={item.id || index} product={item} />
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