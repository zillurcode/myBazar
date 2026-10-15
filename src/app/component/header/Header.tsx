import Image from 'next/image'
import Logo from '@/app/logo-icon.png'
import UserInfo from '../userinfo/UserInfo';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const date = new Date().toLocaleString('bn-BD', {
    dateStyle: 'full'
  });

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

        <UserInfo />
      </div>

      {children}
    </>
  );
};

export default Header;
