import Link from "next/link";

interface Product {
  id?: string | number;
  nameBn?: string;
  category?: string;
  categorySlug?: string;
  categoryIcon?: string;
  image?: string;
  unit?: string;
  today?: number;
}

const AllproductsSection = async () => {
  let products: Product[] = [];

  try {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data) ? data : data?.data || data?.products || [];
    }
  } catch (error) {
    console.error("All Products Fetch Error:", error);
  }

  return (
    <section className="my-8 px-4">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">সব পণ্য</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item, index) => (
            <div key={item.id || index} className="bg-white p-5 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.categoryIcon || item.image || "🛒"}</span>
                <div>
                  <h4 className="font-bold text-lg">{item.nameBn}</h4>
                  <p className="text-sm text-gray-500">৳{item.today ?? 0} / {item.unit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllproductsSection;