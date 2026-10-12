import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';

// ক্যাটাগরি ডেটার জন্য ইন্টারফেস ডিফাইন করা হলো
interface CategoryItem {
    id?: string | number;
    slug?: string;
    nameBn?: string;
    name?: string;
    icon?: string;
}

const Marquee = async () => {
    let headlines: CategoryItem[] = [];
    
    try {
        const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories', {
            cache: 'no-store'
        });
        const data = await res.json();
        
        headlines = Array.isArray(data) ? data : (data?.data || data?.categories || []);
        
    } catch (error) {
        console.error("Marquee Fetch Error:", error);
    }

    return (
        <div className="py-2 bg-gray-100">
            <MarqueeText direction='right' duration={5}>
                {headlines.length > 0 ? (
                    headlines.map((item, index) => (
                        <span key={item.id || index} style={{ marginRight: '40px' }}>
                            {item.icon || "📦"} {item.nameBn || item.name || "ক্যাটাগরি"}
                        </span>
                    ))
                ) : (
                    <span>কোনো ক্যাটাগরি পাওয়া যায়নি</span>
                )}
            </MarqueeText>
        </div>
    );
};

export default Marquee;