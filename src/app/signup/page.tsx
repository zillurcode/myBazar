'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    // Password mismatch
    if (user.password !== user.confirmPassword) {
      toast.error('পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মেলেনি');
      setLoading(false);
      return;
    }

    const { confirmPassword, ...signupData } = user;

    const { data, error } = await authClient.signUp.email({
      ...signupData,
      callbackURL: '/',
    });

   
    if (data) {
      toast.success('সাইন আপ সফল হয়েছে');
      router.push('/');
      router.refresh();
      return;
    }


    if (error) {
      setLoading(false);

      const errorMessage = error.message?.toLowerCase() || '';

      if (
        errorMessage.includes('already exists') ||
        errorMessage.includes('user already exists') ||
        error.status === 422
      ) {
        toast.error('User already exists. Use another email.');
      } else {
        toast.error(error.message || 'সাইন আপ করতে সমস্যা হয়েছে');
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    const result = await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
    console.log(result);
  };

  const handleSignInWithGitHub = async () => {
    const result = await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    });
    console.log(result);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-emerald-100">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 m-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="text-sm text-gray-500 mt-1">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">নাম</span>
            </label>
            <input type="text" name="name" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">ইমেইল</span>
            </label>
            <input type="email" name="email" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">পাসওয়ার্ড</span>
            </label>
            <input type="password" name="password" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">পাসওয়ার্ড নিশ্চিত করুন</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" disabled={loading} className="btn btn-success text-white w-full">
              {loading ? <span className="loading loading-spinner"></span> : 'অ্যাকাউন্ট তৈরি করুন'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm">
          <span>অ্যাকাউন্ট আছে? </span>
          <Link href="/signin" className="text-success hover:underline font-medium">
            সাইন ইন করুন
          </Link>
        </div>

        <div className="divider my-4">অথবা</div>

        <button
          type="button"
          onClick={handleSignInWithGoogle}
          className="btn bg-white text-black hover:bg-gray-100 border border-gray-300 w-full"
        >
          Sign Up with Google
        </button>

        <div className="divider my-4">অথবা</div>

        <button
          type="button"
          onClick={handleSignInWithGitHub}
          className="btn bg-white text-black hover:bg-gray-100 border border-gray-300 w-full"
        >
          Sign Up with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
