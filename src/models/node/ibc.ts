
class Config {
    private _configUrl  : string;
    private _appUrl     : string;

    constructor(config: string , app: string){
        this._appUrl = app;
        this._configUrl = config;
    }
    set configUrl(arg: string){
        this._configUrl = arg;
    }
    set appUrl(arg: string){
        this._appUrl = arg;
    }
    get configUrl(): string {
        return this._configUrl;
    }
    get appUrl(): string {
        return this._appUrl;
    }
}

class IBC {
    private _url        : string;
    private _branch?    : string;
    private _stateSync  : boolean;
    private _build      : boolean;
    private _rpc?       : string;
    private _dir?       : string;
    private _genesis    : string;
    private _config     : Config;
    private _buildCmd   : string[] = [];

    constructor
    (
        url         : string,
        branch      : string,
        stateSync   : boolean,
        build       : boolean,
        rpc         : string,
        dir         : string,
        genesis     : string,
        config      : Config,
        buildCmd    : string[]
    ){
        this._url       = url;
        this._branch    = branch;
        this._stateSync = stateSync;
        this._build     = build;
        this._rpc       = rpc;
        this._dir       = dir;
        this._genesis   = genesis;
        this._config    = config;
        this._buildCmd  = buildCmd;
    }
    set url(arg: string){
        this._url = arg;
    }
    set branch(arg: string | undefined){
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
    set config(arg: Config){
        this._config = arg;
    }
    set buildCmd(arg: string[]){
        this._buildCmd = arg || [];
    }

    get url(): string {
        return this._url;
    }
    get branch(): string | undefined{
        return this._branch;
    }
    get stateSync(): boolean {
        return this._stateSync;
    }
    get build(): boolean {
        return this._build;
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
    get config(): Config {
        return this._config;
    }
    get buildCmd(): string[] {
        return this._buildCmd;
    }
}
export default IBC;