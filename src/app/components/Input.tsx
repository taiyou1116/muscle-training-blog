import React, { HTMLInputTypeAttribute } from 'react'

type inputProps = {
    type: HTMLInputTypeAttribute,
    placeholder: string,
    onChange: (e: any) => void,
    value?: string,
    list?: string,
    classname?: 'number' | 'select',
}

function Input(props: inputProps) {
  const { type, placeholder, onChange, value, list, classname, } = props;

  const inputClass = {
    number: 'w-1/3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500',
    select: 'w-full border border-gray-300 rounded-md text-gray-700 py-2 px-4 focus:ring-blue-500 focus:border-blue-500',
  };

  const selectClassName = inputClass[classname ?? 'number'];

  return (
    <input
      type={ type }
      placeholder={ placeholder }
      onChange={onChange}
      value={ value }
      list={ list }
      className={` ${ selectClassName }` }
      min={1}
    />
  )
}

export default Input