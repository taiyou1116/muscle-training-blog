"use client"
import React, { ChangeEvent, useState } from 'react'
import Input from '../components/Input';

type ExerciseData = {
  selectedExercise: string;
  sets: Array<{
    weight: string;
    reps: string;
  }>;
};

function CreatePost() {
  const [ showForm, setShowForm ] = useState(false);
  const [exercisesData, setExercisesData] = useState<ExerciseData[]>([]);

  const addExerciseData = (newData: ExerciseData) => {
    setExercisesData([...exercisesData, newData]);
  };

  return (
    <div className="flex justify-center h-screen w-full mt-5">
      <div className='flex flex-col items-center w-3/5 h-full bg-slate-50 rounded-lg shadow-md gap-8 p-10'>
        <h1 className=' font-bold text-lg'>新しい投稿</h1>
        { !showForm && 
          <div>
            <button
              className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              onClick={() => setShowForm(!showForm)}
            >
              + 種目を追加
            </button>
          </div>
        }

        { showForm && <ExercisePostForm setShowForm={setShowForm} addExerciseData={addExerciseData} /> }

        { exercisesData.map((data, index) => (
          <p key={index}>{`${data.selectedExercise} - セット数: ${data.sets.length}, 各セット: ${data.sets.map(set => `${set.weight}kg x ${set.reps}回`).join(', ')}`}</p>
        ))}
      </div>
    </div>
  )
}

export default CreatePost


type formProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  addExerciseData: (newData: ExerciseData) => void,
}

function ExercisePostForm(props: formProps) {
  const { setShowForm, addExerciseData } = props;

  // 利用可能な筋トレの種目
  const exercises = [
    'ベンチプレス',
    'デッドリフト',
    'スクワット',
    'バーベルカール',
  ];

  // 選択された筋トレの種目を保持するための状態
  const [selectedExercise, setSelectedExercise] = useState("");

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
    setShowForm(false); // フォーム送信後にフォームを閉じる
  };

  // セット数とそれに対応する重さと回数を保持するためのstate
  const [sets, setSets] = useState([{ weight: '', reps: '' }]);

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
        <button
          type="submit"
          className='mt-4 bg-blue-500 text-white font-bold py-2 px-12 rounded-lg hover:bg-blue-600'
        >
          追加
        </button>
        <button onClick={() => setShowForm(false)}
          className='mt-4 bg-slate-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600'
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
