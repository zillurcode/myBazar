import Link from 'next/link';


const NotFoundPage = () => {
    return (
        <section className="min-h-screen bg-base-200/50 flex items-center justify-center px-4">
            <div className="card bg-base-100 border border-base-200/80 shadow-sm max-w-md w-full p-8 text-center space-y-6">
             
                <div className="w-20 h-20 bg-error/10 text-error rounded-3xl mx-auto flex items-center justify-center text-3xl font-extrabold shadow-inner">
                    404
                </div>
                
             
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-base-content">পৃষ্ঠা পাওয়া যায়নি</h1>
                    <p className="text-sm text-base-content/60 leading-relaxed">
                        দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা খুঁজে পাওয়া যায়নি বা এর ঠিকানা পরিবর্তিত হয়েছে।
                    </p>
                </div>

               
                <div className="pt-2">
                    <Link href="/" className="btn btn-success text-white w-full rounded-xl font-medium text-base shadow-sm">
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;