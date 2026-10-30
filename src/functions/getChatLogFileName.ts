export function getChatLogFileName(format: string) {
    return `chat-log-${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()}.${format}`;
}  