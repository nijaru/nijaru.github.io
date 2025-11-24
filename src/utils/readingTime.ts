const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(text: string): string {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / WORDS_PER_MINUTE);
    return `${minutes} min read`;
}
