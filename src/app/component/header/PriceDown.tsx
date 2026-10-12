

interface Product {
    id?: string | number;
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
}

const PriceFallProducts = async () => {
    let decreasedProducts: Product[] = [];

    try {
        const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
            cache: 'no-store'
        });
        const data = await res.json();
        
        const allProducts: Product[] = Array.isArray(data) ? data : (data?.data || data?.products || []);

      
        const filtered = allProducts.filter(item => {
            return item.change?.dir === "down" || (item.today && item.yesterday && item.today < item.yesterday);
        });

       
        decreasedProducts = filtered.slice(0, 6);

    } catch (error) {
        console.error("Price Fall Fetch Error:", error);
    }

    return (
        <section className="my-20 px-4">
            <div className="container mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-emerald-600 text-xl font-bold">▼</span>
                    <h3 className="text-2xl font-bold text-gray-900">
                        আজ দাম কমেছে
                    </h3>
                </div>

                {decreasedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {decreasedProducts.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className="relative bg-[#F9F9F8] p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl shrink-0 border border-gray-100">
                                        {item.categoryIcon || item.image || "🛒"}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl text-gray-900">
                                            {item.nameBn || "প্রোডাক্ট"}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            প্রতি {item.unit === 'kg' ? 'কেজি' : item.unit === 'litre' ? 'লিটার' : item.unit === 'dozen' ? 'ডজন' : 'পিস'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-xs text-gray-600 mb-0.5">আজকের দাম</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-gray-900">
                                            ৳{item.today || 0}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-800">টাকা</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                        <span>▼</span> {Math.abs(item.change?.pct || 0)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-white rounded-xl border">
                        <p className="text-gray-500">এই মুহূর্তে দাম কমার কোনো তথ্য পাওয়া যায়নি।</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PriceFallProducts;