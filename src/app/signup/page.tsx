import React from 'react';

const SignUpPage = () => {
    return (
        <div className=" flex items-center justify-center min-h-screen bg-emerald-100">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 m-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="text-sm text-gray-500 mt-1">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন</p>
        </div>

        <form className="space-y-4">
       
          <div className="form-control">
            <label className="label">
              <span className="label-text">নাম</span>
            </label>
            <input type="text" placeholder="" className="input input-bordered w-full" required />
          </div>

          
          <div className="form-control">
            <label className="label">
              <span className="label-text">ইমেইল</span>
            </label>
            <input type="email" placeholder="" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">পাসওয়ার্ড</span>
            </label>
            <input type="password" placeholder="" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">পাসওয়ার্ড নিশ্চিত করুন</span>
            </label>
            <input type="password" placeholder="" className="input input-bordered w-full" required />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-success text-white w-full">অ্যাকাউন্ট তৈরি করুন</button>
          </div>
        </form>

      
        <div className="text-center mt-4 text-sm">
          <span>অ্যাকাউন্ট আছে? </span>
          <a href="#" className="text-success hover:underline font-medium">সাইন ইন করুন</a>
        </div>
      </div>
    </div>
    );
};

export default SignUpPage;