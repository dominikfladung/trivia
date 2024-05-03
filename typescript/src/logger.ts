export default class Logger {
    private logs: string[] = []

    public log(text: string) {
        this.logs.push(text)
        console.log(text)
    }

    public getLogs() {
        return this.logs;
    }

    public clear() {
        this.logs = []
    }
}