import Banner from "./component/header/Banner";
import TodayPriceRise from "./component/header/TodayPriceRise";
import PriceDown from '@/app/component/header/PriceDown';
import AllProductsSection from "./component/header/AllproductsSection";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div>
        <Banner />
        <TodayPriceRise />
        <PriceDown />
        <AllProductsSection />
    </div>
  );
}