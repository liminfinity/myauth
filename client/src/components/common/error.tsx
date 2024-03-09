import React from 'react'
import { DefaultProps } from '../../types/components'
import { useAppDispatch } from '../../hook/reduxHooks'
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

interface ErrorProps extends DefaultProps {
    shiftError: ActionCreatorWithoutPayload
}

export default function Error({children, className, shiftError}: ErrorProps) {
    const dispatch = useAppDispatch();


    function handleAnimationEnd() {
        dispatch(shiftError())
    }
    return (
        <div onAnimationEnd={handleAnimationEnd} className={'absolute top-10 error' + (className || '')}>{children}</div>
    )
}
