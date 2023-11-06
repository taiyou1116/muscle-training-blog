import React from 'react'
import { getDocs, query, collectionGroup } from "firebase/firestore";
import { db } from '../lib/firebase';
import Post from './post';

const getData = async () => {
  // サブコレクション 'sub' の全てのドキュメントにアクセスする
  const postsQuery = query(collectionGroup(db, 'sub'));
  const snapshot = await getDocs(postsQuery);

  const postsData = snapshot.docs.map(doc => doc.data());
  return postsData;
};

export default async function TimeLine() {

  const res = await getData();
  console.log(res);

  return (
    <div className='flex flex-col items-center w-3/5 h-full bg-slate-50 rounded-md gap-8 p-10'>
      { res.map((data, index) => (
        <div key={index} className='w-full'>
          <Post 
            title={ data.title }
            text={ data.text }
          />
        </div>
      )) }
    </div>
  )
}