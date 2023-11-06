// タイムラインに表示される一つのポスト

import React from 'react'

type postProps = {
  title: string,
  text: string,
}

function Post(props: postProps) {
  const { title, text } = props;

  return (
    <div className=' bg-slate-200 w-full flex flex-col p-5 rounded-md hover:bg-slate-300 border border-slate-400 cursor-pointer'>
      <h1 className='font-bold p-1 '>{ title }</h1>
      <p>{ text }</p>
    </div>
  )
}

export default Post