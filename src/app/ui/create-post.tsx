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
import { useRouter } from 'next/navigation';
import TrainingDetails from '../components/training-details';

const MAX_SIZE = 2 * 1024 * 1024;

function CreatePost() {
  const [ showForm, setShowForm ] = useState(false);
  // 写真一時保存
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // createPostに送るデータ
  const [exercisesData, setExercisesData] = useState<ExerciseData[]>([]);
  const [text, setText] = useState('');
  const [ fileList, setFiles ] = useState<FileList>();
  const router = useRouter(); 

  // Modalのopen状態
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Postを新規作成
  const handleCreatePost = async () => {
    const success = await createNewPost(exercisesData, text, fileList);
    if (success) {
      router.push("/");
      router.refresh();
    } else {
      alert("投稿に失敗しました。再度投稿してください。");
    }
  };
  
  // メニュー情報を末尾に追加
  const addExerciseData = (newData: ExerciseData) => {
    setExercisesData([...exercisesData, newData]);
  };

  // メニューを削除
  const deleteExerciseData = (deleteData: ExerciseData) => {
    // ボタンのインデックスを配列のインデックスがあったら消す
  }

  // 写真の追加, 一時データ(imageUrls), 実際に送る(fileList)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files.length > 2) {
      alert("最大2枚の写真を選択してください。");
      e.target.value = '';
    }
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_SIZE) {
        alert(`一枚のファイルサイズは2MB以下にしてください。`);
        e.target.value = ''; // ファイル選択をリセット
        return;
      }
    }

    setFiles(files);

    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setImageUrls(imageUrls);
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
              original='py-2 px-4 flex items-center gap-1 mb-5'
              emoji={ <FontAwesomeIcon icon={faDumbbell} />}
              title='種目の追加'
            />
            <div>
              <label htmlFor='file-upload-input' className=' flex bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 gap-1 p-2 cursor-pointer'>
                <PhotoIcon className='h-6 w-6'/>
                写真の選択
              </label>
              <div className='text-xs text-gray-500 mt-1'>最大2枚まで</div>
              <input id="file-upload-input" type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
          </div>
        }

        { showForm && <ExercisePostForm setShowForm={setShowForm} addExerciseData={addExerciseData} /> }
        
        {/* 種目だけ決めて、詳細はダイアログで表示 */}
        <div className='flex gap-1'>
          { exercisesData.map((data, index) => (
            <div key={index}>
              <button 
                className=" font-bold text-xs text-white bg-orange-300 py-2 px-4 rounded-full"
                onClick={() => setDetailModalOpen(true)}
              >
                {data.selectedExercise}
              </button>
            </div>
          )) }
        </div>

        {/* 詳細ダイアログにする */}
        {/* <div className=''>
          { exercisesData.map((data, index) => (
            <div key={index} className=' border-2 rounded-lg py-10 px-20 '>
              <h2 className="font-semibold text-gray-700">{data.selectedExercise}</h2>
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 font-normal">セット</th>
                    <th className="px-4 font-normal">レップス</th>
                    <th className="px-4 font-normal">重量(kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sets.map((set, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 text-center">{index + 1}</td>
                      <td className="px-4 text-center">{set.reps}</td>
                      <td className="px-4 text-center">{set.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div> */}

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
          onClick={handleCreatePost}
          className='blue'
          original='py-2 px-12'
          title='投稿する'
        />
        <button className='bg-slate-500 text-white font-bold py-2 px-12 rounded-lg hover:bg-slate-600'>
          下書き保存
        </button>
      </div>


      {/* Modal */}
      <TrainingDetails 
        onClose={() => setDetailModalOpen(false)}
        open={detailModalOpen}
      />
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
  // セット数とそれに対応する重さと回数を保持するためのstate
  const [sets, setSets] = useState<Set[]>([{ weight: '', reps: '' }]);

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

    if (!selectedExercise) {
      alert('種目の選択をしてください。');
      return; 
    }
    for(let i = 0; i < sets.length; i++) {
      if (!sets[i].reps) {
        alert('レップを入力してください。');
        return; 
      }
      if (!sets[i].weight) {
        alert('ウェイトを入力してください。');
        return; 
      }
    }

    // 新しいエクササイズデータを作成
    const newExerciseData: ExerciseData = {
      selectedExercise,
      sets
    };

    // 親コンポーネントの状態更新関数を呼び出してデータを追加
    addExerciseData(newExerciseData);
    setShowForm(false);
  };

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
      <div className='overflow-auto max-h-64 w-full flex flex-col gap-1 p-1'>
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
