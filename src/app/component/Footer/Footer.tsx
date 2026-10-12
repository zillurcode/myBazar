import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 py-6 px-6 mt-12">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-4">
               
                <div>
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </div>
                
             
                <div>
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </div>
            </div>
        </footer>
    );
};

export default Footer;