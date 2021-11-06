import Hash from '@nox-engine/renderer/src/utils/Hash';

export default class BaseObject {
    public name: string;
    public id: string = Hash.uuid();

    constructor(name: string = '') {
        this.name = name;
    }
}
