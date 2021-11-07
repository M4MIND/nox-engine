export enum CoreEvents {
    START = 'start',
    UPDATE = 'update',
    CAMERA = 'onCamera',
    RENDERER_OBJECT = 'onRendererObject',
    PRE_RENDER = 'onPreRender',
    FIXED_UPDATE = 'onFixedUpdate',
    RAYCAST = 'onRaycastTrigger',
}

export default class EventManager {
    private subscribers: Map<string, Map<string, () => void>> = new Map<string, Map<string, () => void>>();

    public subscribe(event: string, listener: () => void, id: string): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, new Map<string, () => void>());
        }

        this.subscribers.get(event)!.set(id, listener);
    }

    public dispatchById(event: CoreEvents | string, id: string): void {
        if(!this.subscribers.has(event)) {
            return;
        }

        let map = this.subscribers.get(event);

        if (!this.subscribers.get(event)?.has(id)) {
            return;
        }

        let fn =  this.subscribers.get(event)!.get(id) as Function;

        fn();
    }

    public dispatch(event: CoreEvents | string): void {
        if (!this.subscribers.has(event)) {
            return;
        }

        for (let listener of this.subscribers.get(event)!.values() ?? []) {
            listener();
        }
    }
}
