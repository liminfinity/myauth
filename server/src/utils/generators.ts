export function codeGenerator() {
    return random(100000, 999999)
}

export function random(min: number, max: number) {
    return Math.round((Math.random() * (max - min)) + min)
}