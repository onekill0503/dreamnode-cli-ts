import { SpawnSyncReturns , spawnSync } from "child_process";
import depedencyError from "../errors/depedencyError";

export const isDepedencyInstalled = async (program : string ,version: boolean | string = false , versionValidation: Function | undefined): Promise<boolean> => {
    if(program.length < 1) return false;
    return await new Promise(async (resolve , reject) => {
        let opt :  SpawnSyncReturns<string> | undefined;
        let isFail : boolean;
        if(process.platform == 'win32'){
            opt = await spawnSync(program , [] , {encoding: 'utf-8' , shell: true})
            isFail = (opt?.stderr?.includes(`is not recognized as an internal or external command`) || opt?.stdout?.includes(`command not found`)) ? true : false
        }else{
            opt= await spawnSync('which' , [program] , {encoding: 'utf-8' , shell: true})
            isFail = (opt?.stdout == '');
        }
        if(version && !isFail){
            if(versionValidation){
                try{
                    versionValidation(opt,version);
                }catch(err: depedencyError | any){
                    reject(err)
                }
            }
        }
        if(isFail){
            reject(`no ${program} on this computer, you need to install it first`)
        }
        resolve(true)
    })
}