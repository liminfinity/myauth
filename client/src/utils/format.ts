export function minuteFormatBySecond(second: number) {
    const minutes = String(Math.floor(second / 60));
    const restSeconds = String(second % 60);
    return '0'.repeat(2 - minutes.length) + minutes + ':' + '0'.repeat(2 - restSeconds.length) + restSeconds;
}