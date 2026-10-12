import Image from 'next/image'
import Logo from '@/app/logo-icon.png'


const Header = () => {
    const date = new Date().toLocaleString('bn-BD', {
        dateStyle: 'full'
    })

    return (
        <>
            <div className="flex justify-between container mx-auto items-center p-4">
               
                <div className="flex items-center gap-4">
                    <Image 
                        className="bg-green-700 rounded-full h-[40px] w-[40px] object-cover" 
                        src={Logo} 
                        alt="Logo" 
                    />
                    <div>
                        <h2 className="font-bold text-4xl">বাজার দর</h2>
                        <p className="text-gray-500" suppressHydrationWarning>{date}</p>
                    </div>
                </div>

                {/* Right side: Sign In and Sign Up buttons */}
                <div className="flex gap-2">      
                    <button className="btn btn-soft">সাইন ইন</button>
                    <button className="btn btn-success">সাইন আপ</button>
                </div>
            </div>
            
           
        </>
    );
};

export default Header;