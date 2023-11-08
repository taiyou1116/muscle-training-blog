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
    <div className='bg-slate-200 w-full flex flex-col p-5 rounded-md hover:bg-slate-300 border border-slate-400 cursor-pointer'>
      <div className=' flex'>
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
      { data.text }
      { data.exercisesData.map((d: ExerciseData, dataIndex: number) => (
        <React.Fragment key={dataIndex}>
          <span>{d.selectedExercise}</span>
          {d.sets.map((set, index) => (
            <div key={index}>
              <span>Reps: {set.reps} </span>
              <span>Weight: {set.weight}</span>
            </div>
          ))}
        </React.Fragment>
      )) }
    </div>
  )
}

export default Post