
import NavLinks from '@/app/component/NavLinks'
import Banner from "./component/header/Banner";
import TodayPriceRise from "./component/header/TodayPriceRise";
import Marquee from "./component/Marquee";
import PriceDown from '@/app/component/header/PriceDown'
import AllProductsSection from "./component/header/AllproductsSection";
import CategoryCard from './component/CategoryCard';
export default function Home() {
  return (
    <div>

      
       
        <Banner > </Banner>
        <TodayPriceRise ></TodayPriceRise>
        <PriceDown ></PriceDown>
        <AllProductsSection ></AllProductsSection>
       
    </div>
  );
}
