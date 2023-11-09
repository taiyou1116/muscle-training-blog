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
    <div className='bg-slate-200 w-full flex flex-col p-5 gap-3 rounded-md border border-slate-400 cursor-pointer'>
      <div className=' flex gap-3  bg-slate-300 p-3 rounded-lg shadow-lg'>
        {data.parentData.photoURL ? (
          <Image
            src={data.parentData.photoURL}
            alt="User profile picture" // alt属性
            width={25} // 画像の幅
            height={25} // 画像の高さ
          />
        ) : (
          <p>No profile picture available</p>
        )}
        { data.parentData.displayName }
      </div>
      <div className=' bg-slate-50 p-3'>
        { data.exercisesData.map((d: ExerciseData, dataIndex: number) => (
        <React.Fragment key={dataIndex}>
          <h1 className=' font-semibold'>{d.selectedExercise}</h1>
          {d.sets.map((set, index) => (
            <div key={index}>
              <span>{ index + 1 }セット目: </span>
              <span>Reps: {set.reps} </span>
              <span>Weight: {set.weight}</span>
            </div>
          ))}
        </React.Fragment>
      )) }
      </div>
      
      <div className=' p-3'>
        { data.text }
      </div>
    </div>
  )
}

export default Post