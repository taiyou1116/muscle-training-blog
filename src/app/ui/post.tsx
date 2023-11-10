// タイムラインに表示される一つのポスト
import { ExerciseData } from '../types/exercise-data';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react'

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
      <div>
        { data.exercisesData.map((d: ExerciseData, dataIndex: number) => (
          <div key={dataIndex} className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{d.selectedExercise}</h2>
            {d.sets.map((set, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>{ index + 1 }セット目: </span>
                <span>Reps: {set.reps} </span>
                <span>Weight: {set.weight}</span>
              </div>
            ))}
          </div>
        )) }
      </div>

      <div>
        { data.imageUrl ? (
          <div>
          { data.imageUrl.map((url: string, index: number) => (
            <div key={index}>
              <Image src={url} width={50} height={50} alt='body image' />
            </div>
          )) }
          </div>
        ) : (
          <div>
            なし
          </div>
        )}
      </div>
      
      <div className="mt-6 text-gray-700">
        { data.text }
      </div>
    </div>
  )
}

export default Post