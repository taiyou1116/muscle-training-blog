import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../lib/firebase';

const getData = async () => {
  const postData = collection(db, "posts");
  const snapshot = await getDocs(postData);
  
  const docsData = snapshot.docs.map(doc => doc.data());
  return docsData;
}

export default async function TimeLine() {

  const res = await getData();
  console.log(res);

  return (
    <div>
      {/* DBからタイムラインを取得してmapでpostを表示 */}
      <div>time-line</div>
      { res.map((data) => (
        <div key={data.title}>
          <h1>{data.title}</h1>
          <p>{data.text}</p>
        </div>
      )) }
    </div>
  )
}