class depedencyError {
    private _message: string;
    private _installable: boolean;
    private _installation?: Function | undefined;

    constructor(message: string , installable:boolean , installation?: Function | undefined){
        this._message = message;
        this._installable = installable;
        this._installation = installation;
    }

    get message(): string {
        return this._message;
    }
    get installable(): boolean {
        return this._installable;
    }
    get installation(): Function | undefined {
        return this._installation;
    }
}
export default depedencyError;