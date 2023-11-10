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
      <div className=' p-3 rounded-lg shadow-lg bg-slate-200 mb-3 flex flex-col gap-3'>
        <h2 className=' mt-5 ml-3 font-bold'>💪ワークアウト</h2>
        { data.exercisesData.map((d: ExerciseData, dataIndex: number) => (
          <div key={dataIndex} className=" bg-white p-4 rounded-lg">
            <h2 className="font-semibold text-gray-700 mb-3">{d.selectedExercise}</h2>
            {d.sets.map((set, index) => (
              <div key={index} className="grid grid-cols-6 gap-5 items-center">
                <span className="">セット {index + 1}:</span>
                <span>レップ:  {set.reps} </span>
                <span className='flex items-center'> <FontAwesomeIcon icon={faDumbbell} height={20} />: {set.weight} kg </span>
              </div>
            ))}
          </div>
        )) }
      </div>

      <div>
        { data.imageUrl ? (
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
      
      <div className="mt-6 text-gray-700">
        { data.text }
      </div>
    </div>
  )
}

export default Post