import React from 'react';

interface Market {
    market?: string;
    division?: string;
    min?: number;
    max?: number;
}

interface ProductProps {
    product: {
        id?: string | number;
        name?: string;
        nameBn?: string;
        categoryNameBn?: string;
        categoryIcon?: string;
        unit?: string;
        image?: string;
        today?: number;
        yesterday?: number;
        change?: {
            dir?: string;
            pct?: number;
        };
        markets?: Market[];
    };
}

const CategoryCard = ({ product }: ProductProps) => {
    const isUp = product.change?.dir === 'up';
    const pctValue = Math.abs(product.change?.pct || 0);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl border border-emerald-100">
                            {product.image || product.categoryIcon || '🛒'}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">
                                {product.nameBn || product.name}
                            </h3>
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                                {product.categoryNameBn}
                            </span>
                        </div>
                    </div>

                    {product.change && (
                        <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full border ${
                            isUp 
                                ? 'text-red-600 bg-red-50 border-red-100' 
                                : 'text-emerald-600 bg-emerald-50 border-emerald-100'
                        }`}>
                            <span>{isUp ? '▲' : '▼'}</span> 
                            {pctValue}%
                        </span>
                    )}
                </div>

              
                <div className="mt-4 grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400">আজকের দাম</p>
                        <p className="text-xl font-black text-gray-900">৳{product.today} <span className="text-xs font-normal text-gray-500">/{product.unit}</span></p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">গতকালের দাম</p>
                        <p className="text-lg font-bold text-gray-700">৳{product.yesterday}</p>
                    </div>
                </div>

               
                {product.markets && product.markets.length > 0 && (
                    <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-500 mb-2">বাজারের তালিকা ({product.markets.length}টি বাজার):</p>
                        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                            {product.markets.map((m, mIndex) => (
                                <div key={mIndex} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-gray-100">
                                    <span className="font-medium text-gray-800">{m.market} ({m.division})</span>
                                    <span className="text-gray-600 font-semibold">৳{m.min} - ৳{m.max}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryCard;