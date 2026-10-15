"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import BannerImg from '@/app/bazar-hero.png';
import Link from "next/link"; 

const Banner = () => {
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        setDate(
            new Date().toLocaleDateString('bn-BD', {
                dateStyle: 'full'
            })
        );
    }, []);

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between my-10 p-10 bg-white">
            <div className="container mx-auto">
                <p className="bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-medium w-fit rounded-full mb-3" suppressHydrationWarning>
                    {date}
                </p>
                <h2 className="font-bold text-4xl mt-2">আজকের বাজারের দাম এক নজরে</h2>
                <p className="font-semibold text-xl py-4 text-gray-600">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন <br />
                    সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>
                
                <Link href={''} className="btn btn-success text-white px-6">
                    সব পণ্য দেখুন
                </Link>
            </div>
            
            <div className="mt-6 lg:mt-0">
                <Image 
                    src={BannerImg} 
                    alt="banner" 
                    width={500} 
                    height={400} 
                    priority 
                />
            </div>
        </div>
    );
};

export default Banner;