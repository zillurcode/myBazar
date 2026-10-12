import Link from 'next/link';

interface Category {
  name?: string;
  nameBn?: string;
  icon?: string;
  slug?: string;
}

const NavLinks = async () => {
  let categories: Category[] = [];

  try {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');
    
    if (res.ok) {
      const data = await res.json();
      categories = Array.isArray(data) ? data : (data?.data || data?.categories || []);
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
   <nav className="bg-emerald-50 border-b border-emerald-100 py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto scrollbar-hide py-1">
  {categories.map((item, index) => (
    <Link 
      key={item.slug || item.id || index} 
      href={`/category/${item.slug || item.id}`}
      className="px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 hover:bg-emerald-600 hover:text-white transition-all whitespace-nowrap shadow-sm"
    >
      <span>{item.icon } {item.nameBn|| item.name}</span>
    </Link>
  ))}
</div>
      </div>
    </nav>
  );
};

export default NavLinks;