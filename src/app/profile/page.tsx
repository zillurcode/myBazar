'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession(); // Added isPending check
    const user = session?.user;
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const newUserData = Object.fromEntries(formData.entries()) as {
            name: string;
        };

        const { data, error } = await authClient.updateUser({
            name: newUserData.name,
        });

        if (data) {
            toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
            router.refresh();
        }

        if (error) {
            toast.error(error.message || 'আপডেট করতে সমস্যা হয়েছে');
        }

        setLoading(false);
    };

    // Show a clean loading state while the session is being fetched
    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200/50">
                <span className="loading loading-spinner loading-lg text-success"></span>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-base-200/50 py-10 px-4 flex flex-col items-center">
            <div className="w-full max-w-2xl mb-6">
                <h1 className="text-3xl font-bold text-base-content">আমার প্রোফাইল</h1>
                <p className="text-sm text-base-content/60 mt-1">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            <div className="w-full max-w-2xl space-y-6">
                <div className="card bg-base-100 border border-base-200/80 shadow-sm p-6 flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-base-300">
                                <img src={user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="User Avatar" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-base-content">{user?.name || 'ব্যবহারকারী'}</h2>
                            <p className="text-sm text-base-content/60">{user?.email}</p>
                        </div>
                    </div>

                    <Link href={'/signin'}>
                        <button className="btn btn-outline btn-error btn-sm sm:btn-md rounded-xl gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            সাইন আউট
                        </button>
                    </Link>
                </div>

                <div className="card bg-base-100 border border-base-200/80 shadow-sm p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-base-content mb-4">তথ্য</h3>

                    <form className="space-y-4" onSubmit={handleUpdateProfile}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-base-content/80">নাম</span>
                            </label>
                          
                            <input 
                                type="text" 
                                name="name"
                                defaultValue={user?.name || ''} 
                                key={user?.name} 
                                className="input input-bordered w-full rounded-xl bg-base-100 focus:input-success transition-all" 
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn btn-success text-white w-full rounded-xl font-medium text-base shadow-sm mt-2"
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                'আপডেট'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;