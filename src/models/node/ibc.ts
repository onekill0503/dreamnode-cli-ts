
class IBC {
    private _url: string;
    private _branch: string;
    private _stateSync: string | boolean;

    constructor(url: string , branch: string , stateSync:string){
        this._url = url;
        this._branch = branch;
        this._stateSync = stateSync;
    }
    set url(arg: string){
        this._url = arg;
    }
    set branch(arg: string){
        this._branch = arg;
    }
    set stateSync(arg: string | boolean){
        this._stateSync = arg;
    }
    get url(): string {
        return this._url;
    }
    get branch(): string {
        return this._branch;
    }
    get stateSync(): string | boolean {
        return this._stateSync;
    }
}
export default IBC;