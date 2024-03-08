import React, { ChangeEvent, SetStateAction, useRef, useState, KeyboardEvent, useEffect, Dispatch } from 'react'
import { DefaultProps } from '../../types/components'


interface OTPInputProps extends DefaultProps {
    otp: string[],
    setOTP: Dispatch<SetStateAction<string[]>>
}
let currentOTPIndex = 0;
export default function OTPInput({otp, setOTP}: OTPInputProps) {
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleChange({target}: ChangeEvent<HTMLInputElement>) {
        const {value} = target;
        if (Number(value) || !value) {
            setOTP(prevOTP => {
                const newOTP = [...prevOTP];
                newOTP[currentOTPIndex] = value.substring(value.length - 1);
                if (!value) setActiveOTPIndex(currentOTPIndex - 1);
                else setActiveOTPIndex(currentOTPIndex + 1)
                return newOTP
            })
        }
        
    }
    async function handlePaste() {
        const code = await navigator.clipboard.readText();
        if (Number(code)) {
            setOTP(prevOTP => {
                const newOTP = [...prevOTP];
                currentOTPIndex = 0;
                for (let i = 0; i < code.length; i++) {
                    newOTP[i] = code[i];
                    currentOTPIndex++;
                }
                setActiveOTPIndex(currentOTPIndex - 1)
                return newOTP
            })
        }
    }
    function handleKeyDown({key}: KeyboardEvent<HTMLInputElement>, index: number) {
        currentOTPIndex = index;
        if (key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1)
    }
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [activeOTPIndex])

  return (
    <div className='flex justify-center gap-2 sm:justify-around sm:gap-0'>
        {otp.map((_, index) => {
            return <input className='spin-button-none w-10 h-10 sm:w-12 sm:h-12 text-center rounded-lg text-xl text-title focus:outline-blue focus:text-blue border-2 border-text_mainColor' 
            type='number' value={otp[index]} 
            onChange={handleChange} onKeyDown={e => handleKeyDown(e, index)} onPaste={handlePaste}
            ref={index === activeOTPIndex ? inputRef : null}/>
        })}
    </div>
  )
}
