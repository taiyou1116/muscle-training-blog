// タイムラインに表示される一つのポスト
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExerciseData } from '../types/exercise-data';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

type Props = {
  data: DocumentData,
};

function Post(props: Props) {
  const { data } = props;

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className=' flex items-center mb-6'>
        {data.parentData.photoURL ? (
          <Image
            src={data.parentData.photoURL}
            alt="User profile picture" // alt属性
            width={50} // 画像の幅
            height={50} // 画像の高さ
            className='h-10 w-10 rounded-full'
          />
        ) : (
          <p>No profile picture available</p>
        )}
        <div className="ml-4">
          <p className="text-lg font-bold text-gray-800">{data.parentData.displayName}</p>
        </div>
      </div>

      {/* 写真表示 */}
      <div>
        { data.imageUrl !== null ? (
          <div className='flex'>
          { data.imageUrl.map((url: string, index: number) => (
            <div key={index}>
              <Image src={url} width={200} height={200} alt='body image' />
            </div>
          )) }
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* 筋トレ内容 */}
      <div className='mt-6 p-10 rounded-lg shadow-lg bg-slate-200 mb-3 flex flex-col gap-3'>
        {/* 表形式試す */}
        <h2 className=' mt-5 ml-3 font-bold'>🔥ワークアウト</h2>
        { data.exercisesData.map((d: ExerciseData, dataIndex: number) => (
          <div key={dataIndex} className=" bg-white p-4 rounded-lg">
            <h2 className="font-semibold text-gray-700 mb-3">{d.selectedExercise}</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">セット</th>
                  <th className="px-4 py-2">レップス</th>
                  <th className="px-4 py-2">重量(kg)</th>
                </tr>
              </thead>
              <tbody>
                {d.sets.map((set, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{set.reps}</td>
                    <td className="px-4 py-2 text-center">{set.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )) }
      </div>
      
      {/* 本文 */}
      <div className="mt-6 text-gray-700">
        { data.text }
      </div>
    </div>
  )
}

export default Post