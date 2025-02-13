export default function toOrdinal(num: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = num % 100;
    const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
    return `${num}${suffix}`;
}