import Image from "next/image";
import Link from "next/link";
import BannerImg from "@/app/bazar-hero.png";

const Banner = () => {
  return (
    <section className="my-10 flex flex-col items-center justify-between gap-8 bg-white p-10 lg:flex-row">
      <div className="flex-1">
        <h2 className="mt-2 text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h2>
        <p className="py-4 text-xl font-semibold text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
          গড়, সর্বনিম্ন, সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <Link href="/products" className="btn btn-success px-6 text-white">
          সব পণ্য দেখুন
        </Link>
      </div>

      <div className="w-full max-w-md lg:max-w-lg">
        <Image
          src={BannerImg}
          alt="আজকের বাজারদর ব্যানার"
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
};

export default Banner;