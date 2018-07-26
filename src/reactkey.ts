export const tokens: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

class ReactKey {
    private _keyLength: number = 4;
    private _maxTries: number = 15;
    private _unique: boolean = false;
    private _usedKeys: string[] = [];
    private _tokens: string = tokens;

    private generateUniqueKey(length: number): string {
        for (let i: number = 0; i < this._maxTries; ++i) {
            const res: string = this.generateId(length);

            if (this._usedKeys.includes(res) == false) {
                this._usedKeys.push(res);
                return res;
            }
        }

        throw new Error(`Could not find a unique ID after ${this._maxTries} tries`);
    }

    private generateId(keyLength: number): string {
        let text: string = '';

        for(let i: number = 0; i < keyLength; ++i) {
            text += this._tokens.charAt(Math.floor(Math.random() * keyLength));
        }
        
        return text;
    }

    set keyLength(length: number) {
        this._keyLength = length;
    }

    set maxTries(maxTries: number) {
        this._maxTries = maxTries;
    }

    set unique(unique: boolean) {
        this._unique = unique;
    }

    set tokens(tokens: string) {
        this._tokens = tokens;
    }

    get unique() {
        return this._unique;
    }

    get usedKeys() {
        return this._usedKeys;
    }

    public generate(length: number = this._keyLength): string {
        if (this.unique) {
            return this.generateUniqueKey(length);
        }

        return this.generateId(length);
    }

    public generateList(listLength: number, keyLength: number = this._keyLength): string[] {
        const keyList: string[] = [];

        for (let i: number = 0; i < listLength; ++i) {
            keyList.push(this.generate(keyLength));
        }

        return keyList;
    }

    public clearUsedKeys() {
        this._usedKeys = [];
    }
}

const reactkey = new ReactKey();

export default reactkey;