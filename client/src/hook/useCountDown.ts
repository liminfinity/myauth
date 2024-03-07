import { useState } from "react";

export function useCountDown(startNumber: number) {
    return useState(startNumber)
}