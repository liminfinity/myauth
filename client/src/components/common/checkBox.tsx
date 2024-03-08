import React, { ChangeEventHandler, useRef } from 'react'
import { DefaultProps } from '../../types/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


export interface CheckBoxProps extends DefaultProps {
  name: string,
  checked: boolean,
  handleChange: ChangeEventHandler<HTMLInputElement>

}


export default function CheckBox({className, name, checked, handleChange}: CheckBoxProps) {
  const checkBoxRef = useRef<HTMLInputElement>(null);
  function handleReplaceChecked() {
    const checkBox = checkBoxRef.current
    if (checkBox) {
      checkBox.checked = !checkBox.checked 
    }
    
  }
  return (
    <div>
      <input ref={checkBoxRef} type="checkbox" name={name} className='hidden' checked={checked} onChange={handleChange}/>
      <span onClick={handleReplaceChecked} className={'cursor-pointer border-2 rounded-full transition-all duration-100 flex justify-center items-center ' + (checked ? 'bg-blue border-blue ' : '') + (className ?? "")}>
        <FontAwesomeIcon onClick={handleReplaceChecked} icon={faCheck} className='p-1 w-3 h-3 text-white'/>
      </span>
    </div>
    

  )
}
