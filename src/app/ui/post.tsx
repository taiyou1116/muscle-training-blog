// タイムラインに表示される一つのポスト

import React from 'react'

type postProps = {
  title: string,
  text: string,
}

function Post(props: postProps) {
  const { title, text } = props;

  return (
    <div className=' bg-slate-300 w-full flex flex-col p-3'>
      <h1>{ title }</h1>
      <p>{ text }</p>
    </div>
  )
}

export default Post