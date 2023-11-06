"use client"
import React, { ChangeEvent, useState } from 'react'

function CreatePost() {
  return (
    <div className="flex justify-center h-screen w-full mt-5">
      <div className='flex flex-col items-center w-3/5 h-full bg-slate-50 rounded-md gap-8 p-10'>
        <h1 className=' font-bold'>新しい投稿</h1>
          <ExercisePostForm /> 
      </div>
    </div>
  )
}


export default CreatePost

function ExercisePostForm() {
  // 利用可能な筋トレの種目
  const exercises = [
    'ベンチプレス',
    'デッドリフト',
    'スクワット',
    'バーベルカール',
  ];

  // 選択された筋トレの種目を保持するための状態
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);

  // テキスト入力を変更したときに発火する関数
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedExercise(event.target.value);
  };

  // フォームを提出する際のハンドラー
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ここで選択された種目を処理する
    console.log(`Selected exercise: ${selectedExercise}`);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center p-4 bg-white shadow-md rounded-lg'>
      <label htmlFor="exercise-select" className='font-semibold text-lg'>種目を選択:</label>
      <div className="flex gap-2 w-full max-w-md">
        <input
          list="exercises-list"
          value={selectedExercise}
          onChange={handleInputChange}
          placeholder="種目を入力または選択"
          className='w-full border border-gray-300 rounded-md text-gray-700 py-2 px-4 focus:ring-blue-500 focus:border-blue-500'
        />
        <datalist id="exercises-list">
          {exercises.map((exercise) => (
            <option key={exercise} value={exercise} />
          ))}
        </datalist>
      </div>

    <div className='flex gap-2 w-full max-w-md'>
      <input
        type='number'
        placeholder='重さ (kg)'
        className='w-1/3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type='number'
        placeholder='回数'
        className='w-1/3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type='number'
        placeholder='セット数'
        className='w-1/3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
    
    <button
      type="submit"
      className='mt-4 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline'
    >
      追加
    </button>
  </form>
  );
}
