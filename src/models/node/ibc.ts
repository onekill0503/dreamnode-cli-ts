
class IBC {
    private _url: string;
    private _branch: string;
    private _stateSync: boolean;
    private _build: boolean;
    private _rpc?: string;
    private _dir?: string;
    private _genesis: string;

    constructor(url: string , branch: string , stateSync:boolean , build: boolean , rpc: string , dir: string , genesis: string){
        this._url = url;
        this._branch = branch;
        this._stateSync = stateSync;
        this._build = build;
        this._rpc = rpc;
        this._dir = dir;
        this._genesis = genesis;
    }
    set url(arg: string){
        this._url = arg;
    }
    set branch(arg: string){
        this._branch = arg;
    }
    set stateSync(arg: boolean){
        this._stateSync = arg;
    }
    set build(arg: boolean){
        this._build = arg;
    }
    set rpc(arg: string | undefined){
        this._rpc = arg;
    }
    set dir(arg: string | undefined){
        this._dir = arg;
    }
    set genesis(arg: string){
        this._genesis = arg;
    }
    get url(): string {
        return this._url;
    }
    get branch(): string {
        return this._branch;
    }
    get stateSync(): boolean {
        return this._stateSync;
    }
    get rpc(): string | undefined{
        return this._rpc;
    }
    get dir(): string | undefined{
        return this._dir;
    }
    get genesis(): string {
        return this._genesis;
    }
}
export default IBC;