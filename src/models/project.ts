import IBC from "./node/ibc";

class Project {
    private _name: string;
    private _chain : string;
    private _repo: IBC;
    private _peers: string;
    private _node_type: string;

    constructor(name:string,chain: string,repo: IBC,peers: string , node_type:string , stateSync: string){
        this._name = name;
        this._chain = chain;
        this._repo = repo;
        this._peers = peers;
        this._node_type = node_type;
    }

    set name(arg: string){
        this._name = arg;
    }
    set chain(arg: string){
        this._chain = arg;
    }
    set repo(arg: IBC){
        this._repo = arg;
    }
    set peers(arg: string){
        this._peers = arg;
    }
    set node_type(arg: string){
        this._node_type = arg;
    }
    get name(): string {
        return this._name;
    }
    get chain(): string {
        return this._chain;
    }
    get repo(): IBC {
        return this._repo;
    }
    get peers(): string {
        return this._peers;
    }
    get node_type(): string {
        return this._node_type;
    }
}

export default Project;