import React from 'react'
import { getData } from '../lib/firebase';
import Post from './post';

export default async function TimeLine() {

  const res = await getData();

  return (
      <div className='flex flex-col items-center w-3/5 h-full bg-slate-50 rounded-md gap-8 p-10'>
       { res.map((data, index) => (
         <div key={index} className='w-full'>
          <Post 
            data={data}
          />
         </div>
       )) }
      </div>
  );
}