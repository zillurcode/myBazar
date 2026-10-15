'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';

const SignInPage = () => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: '/',
    });

    // SUCCESS
    if (data) {
      toast.success('সাইন ইন সফল হয়েছে');
    }

    // ERROR
    if (error) {
      toast.error(error.message || 'সাইন ইন করতে সমস্যা হয়েছে');
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
    <section className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="text-center max-w-md mx-auto mb-6">
        <h2 className="text-3xl font-bold text-base-content mb-2">সাইন ইন</h2>
        <p className="text-sm text-base-content/70">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-200 p-6 sm:p-8">

        <form onSubmit={handleSubmit} className="card-body p-0">

          <div className="form-control mb-4">
            <label className="label pt-0">
              <span className="label-text font-medium">ইমেইল</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="yourname@example.com"
              className="input input-bordered w-full focus:input-success transition-all"
              required
            />
          </div>

          <div className="form-control mb-2">
            <label className="label pt-0">
              <span className="label-text font-medium">পাসওয়ার্ড</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full focus:input-success transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between my-2 text-sm">
            <label className="label cursor-pointer justify-start gap-2 p-0">
              <input type="checkbox" className="checkbox checkbox-success checkbox-sm" />
              <span className="label-text">মনে রাখুন</span>
            </label>
            <a href="#forgot-password" className="link link-success text-xs font-medium no-underline hover:underline">
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-success text-white w-full hover:shadow-md transition-all"
            >
              সাইন ইন
            </button>
          </div>

        </form>

        <div className="divider my-4">অথবা</div>

        <button
          type="button"
          onClick={handleSignInWithGoogle}
          className="btn bg-white text-black hover:bg-gray-100 border border-gray-300 w-full"
        >
          Sign in with Google
        </button>

        <div className="divider my-4">অথবা</div>

        <button
          type="button"
          onClick={handleSignInWithGitHub}
          className="btn bg-white text-black hover:bg-gray-100 border border-gray-300 w-full"
        >
          Sign in with GitHub
        </button>

        <Link href="/signup" className="mt-4 text-sm text-center text-success hover:underline">
          <button className="btn btn-info text-white">অ্যাকাউন্ট নেই?</button>
        </Link>

      </div>
    </section>
  );
};

export default SignInPage;
