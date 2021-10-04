export default class EventManager {
    private readonly events: { [index: string]: (() => void)[] } = {};

    public subscribe(event: string, callback: () => void) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callback);
    }

    public dispatch(event: string) {
        for (let e of this.events[event] ?? []) {
            e();
        }
    }
}
