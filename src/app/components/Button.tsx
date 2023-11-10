import React from 'react'

type Props = {
    onClick?: () => void,
    className?: 'blue' | 'slate',
    original?: string,
    title: string,
    emoji?: JSX.Element,
    type?: 'button' | 'submit',
}

function Button(props: Props) {
  const { onClick, className, original, emoji, title,type } = props;

  // パディングだけはoriginalで決める   
  const buttonStyle = {
    blue: `bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 ${ original } `,
    slate: `bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-600 ${ original } `,
    original: ` ${ original }`,
  }

  const selectClassName = buttonStyle[className ?? 'original'];

  return (
    <button 
      onClick={ onClick ? () => onClick() : undefined}
      className={` ${ selectClassName }` }
      type={ type ?? 'button' }
    >
      { emoji }
      { title }
    </button>
  )
}

export default Button