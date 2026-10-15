'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log(user);
    const handleSignOut = async () => {
      await authClient.signOut();
    }

    return (
       <div>
         {user ? (
            <div>
<Link href={'/profile'}> <div className="avatar avatar-online">
  <div className="w-10 rounded-full">
  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" />
  </div>
</div></Link>
<h2> {user?.name}</h2>
<button onClick={handleSignOut} className='btn btn-success'>Sign Out</button>

<div className="avatar avatar-offline">
  
</div>

            </div> 
         ) : (
            <div className="flex gap-2">      
               <Link href={'/signin'} > <button className="btn btn-soft">সাইন ইন</button></Link>
                <Link href={'/signup'}><button className="btn btn-success">সাইন আপ</button></Link>
            </div>
         )}
       </div>
    );
};

export default UserInfo;