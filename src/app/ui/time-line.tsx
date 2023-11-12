import React from 'react'
import { getData } from '../lib/firebase';
import Post from './post';

export default async function TimeLine() {

  const res = await getData();

  return (
      <div className='flex flex-col items-center w-3/5 gap-5 px-10 py-5 overflow-auto'>
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