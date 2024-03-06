import { Action } from "@reduxjs/toolkit";

export function isPending(action: Action) {
    return action.type.endsWith('pending')
}
export function isError(action: Action) {
    return action.type.endsWith('rejected')
}
export function isFulfilled(action: Action) {
    return action.type.endsWith('fulfilled')
}

export function isI(myUserId: string, smbUserId: string) {
    return myUserId === smbUserId;
}