import { SpawnSyncReturns } from "child_process";
import { compareVersions , validate } from "compare-versions";
import depedencyError from "../../errors/depedencyError";
import { installGo } from "../installs/golang";

const isValidVersion = (opt: SpawnSyncReturns<string> , version: string) => {
    if(!validate(version)) throw new Error(`${version} is not valid version`);
    // convert version from command to string
    let optVer: string | undefined = opt?.stdout?.split(' ')[2];
    optVer = optVer?.slice(2 , optVer.length);
    // convert all version to string version
    let ver: string = optVer ? optVer : '0.0.0';
    let parasVersion: string = typeof(version) == 'string' ? version : '1.1.1'
    if(compareVersions(ver , parasVersion) < 0){
        throw new depedencyError(`Version is lower and incompatible` , true , installGo);
    }
}
export default isValidVersion;