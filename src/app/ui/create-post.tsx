"use client"
import React, { ChangeEvent, useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import { createNewPost } from '../lib/firebase';
import { ExerciseData } from '../types/exercise-data';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

function CreatePost() {
  const [ showForm, setShowForm ] = useState(false);
  const [exercisesData, setExercisesData] = useState<ExerciseData[]>([]);
  const [text, setText] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const addExerciseData = (newData: ExerciseData) => {
    setExercisesData([...exercisesData, newData]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files;
    const imageUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          imageUrls.push(e.target.result as string);
          if (imageUrls.length === files.length) {
            // 全ての画像が読み込まれたら、状態を更新
            setImageUrls(imageUrls);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }
  

  return (
    <div className="flex justify-center h-[calc(100vh-7rem)] w-full mt-5">
      <div className='flex flex-col items-center w-3/5 h-full bg-slate-50 rounded-lg shadow-md gap-5 p-8'>
        <h1 className=' font-bold text-lg'>新しい投稿</h1>
        { !showForm && 
          <div className='flex gap-2'>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className='blue'
              original='py-2 px-4'
              emoji={ <FontAwesomeIcon icon={faDumbbell} />}
              title='種目の追加'
            />
            <div>
              <label htmlFor='file-upload-input' className=' flex bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 gap-1 p-2 cursor-pointer'>
                <PhotoIcon className='h-6 w-6'/>
                写真の選択
              </label>
              <input id="file-upload-input" type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
          </div>
        }

        { showForm && <ExercisePostForm setShowForm={setShowForm} addExerciseData={addExerciseData} /> }

        { exercisesData.map((data, index) => (
          <p key={index}>{`${data.selectedExercise} - セット数: ${data.sets.length}, 各セット: ${data.sets.map(set => `${set.weight}kg x ${set.reps}回`).join(', ')}`}</p>
        ))}

        {/* 写真の表示 */}
        <div className='flex gap-3'>
          { imageUrls.map((image, index) => (
            <div className='flex' key={index}>
              <Image src={image} width={50} height={50} alt="Uploaded Image" />
            </div>
          )) }
        </div>

        <div className=' bg-slate-200 h-full w-full rounded-md p-3 shadow-lg'>
          <textarea onChange={(e) => setText(e.target.value)} placeholder='自由欄: 好きなことを書こう(300文字まで)' className='bg-slate-200 h-full w-full rounded-md p-3 outline-none resize-none'/>
        </div>
      </div>

      <div className=' bg-slate-50 ml-5 h-3/6 w-1/6 rounded-lg shadow-md flex flex-col gap-8 p-8'>
        <h1 className=' font-bold'>投稿</h1>
        <Button 
          onClick={() => createNewPost(exercisesData, text)}
          className='blue'
          original='py-2 px-12'
          title='投稿する'
        />
        <button className='bg-slate-500 text-white font-bold py-2 px-12 rounded-lg hover:bg-slate-600'>
          下書き保存
        </button>
      </div>
    </div>
  )
}

export default CreatePost


type FormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  addExerciseData: (newData: ExerciseData) => void,
}

function ExercisePostForm(props: FormProps) {
  const { setShowForm, addExerciseData } = props;
  // 選択された筋トレの種目を保持するための状態
  const [selectedExercise, setSelectedExercise] = useState("");

  // 利用可能な筋トレの種目
  const exercises = [
    'ベンチプレス',
    'デッドリフト',
    'スクワット',
    'バーベルカール',
  ];

  type Set = {
    weight: string,
    reps: string,
  }

  // テキスト入力を変更したときに発火する関数
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedExercise(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 新しいエクササイズデータを作成
    const newExerciseData: ExerciseData = {
      selectedExercise,
      sets
    };

    // 親コンポーネントの状態更新関数を呼び出してデータを追加
    addExerciseData(newExerciseData);
    setShowForm(false);
  };

  // セット数とそれに対応する重さと回数を保持するためのstate
  const [sets, setSets] = useState<Set[]>([{ weight: '', reps: '' }]);

  // セット数が変更されたときに呼ばれる関数
  const handleSetCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const setCount = parseInt(event.target.value, 10);
    if (setCount && setCount > 0) {
      // 入力されたセット数に基づいて新しいsets配列を作成
      setSets(Array.from({ length: setCount }, () => ({ weight: '', reps: '' })));
    } else {
      // 無効な入力の場合はsetsを空にする
      setSets([]);
    }
  };

  // 重さと回数の入力が変更されたときに呼ばれる関数
  const handleSetChange = (index: number, field: 'weight' | 'reps') => (event: ChangeEvent<HTMLInputElement>) => {
    const newSets = [...sets];
    newSets[index][field] = event.target.value;
    setSets(newSets);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center p-4 bg-white shadow-md rounded-lg'>
      <label htmlFor="exercise-select" className='font-semibold text-lg'>種目を選択:</label>
      <div className="flex gap-2 w-full max-w-md">
        <Input 
          type='input'
          list='exercises-list'
          value={ selectedExercise }
          onChange={handleInputChange}
          placeholder='種目を入力または選択'
          classname='select'
        />
        <datalist id="exercises-list">
          {exercises.map((exercise) => (
            <option key={exercise} value={exercise} />
          ))}
        </datalist>
      </div>

      {/* セット数入力 */}
      <div className='flex gap-2 w-full max-w-md'>
        <Input 
          type='number'
          placeholder='セット数'
          onChange={handleSetCountChange}
        />
      </div>

      {/* セットごとの重さと回数入力 */}
      <div className='overflow-auto max-h-64 w-full flex flex-col gap-1'>
        {sets.map((set, index) => (
          <div key={index} className='flex gap-2 w-full max-w-md items-center justify-center'>
            <span>{`${index + 1}セット目:`}</span>
            <Input 
              type='number'
              placeholder='重さ (kg)'
              value={set.weight}
              onChange={handleSetChange(index, 'weight')}
            />
            <Input 
              type='number'
              placeholder='回数'
              value={set.reps}
              onChange={handleSetChange(index, 'reps')}
            />
          </div>
        ))}
      </div>
      <div className=' flex gap-10'>
        <Button 
          type='submit'
          className='blue'
          original='py-2 px-12 mt-4'
          title='追加'
        />
        <Button 
          onClick={() => setShowForm(false)}
          className='slate'
          original='py-2 px-6 mt-4'
          title='キャンセル'
        />
      </div>
    </form>
  );
}
