import Link from 'next/link';


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

const AllProductsSection = async () => {
    let allProducts: Product[] = [];

    try {
        const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
            cache: 'no-store'
        });
        const data = await res.json();
        
        allProducts = Array.isArray(data) ? data : (data?.data || data?.products || []);

    } catch (error) {
        console.error("All Products Fetch Error:", error);
    }

    return (
        <section id="সব-পণ্য" className="my-10 px-4">
            <div className="container mx-auto">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                        সব পণ্য
                    </h3>
                    <span className="text-sm bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-semibold">
                        মোট {allProducts.length > 0 ? allProducts.length : 33} 
                    </span>
                </div>

              
                {allProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allProducts.map((item, index) => (
                            <Link href={'/'}
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

                                {item.change && (
                                    <div className="absolute bottom-4 right-4">
                                        <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full border ${
                                            item.change.dir === 'up' 
                                                ? 'text-red-600 bg-red-50 border-red-100' 
                                                : 'text-emerald-600 bg-emerald-50 border-emerald-100'
                                        }`}>
                                            <span>{item.change.dir === 'up' ? '▲' : '▼'}</span> 
                                            {Math.abs(item.change.pct || 0)}%
                                        </span>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border">
                        <p className="text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllProductsSection;