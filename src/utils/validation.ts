import { SpawnSyncReturns , spawnSync } from "child_process";
import {  compareVersions } from 'compare-versions';


export const isDepedencyInstalled = async (version: boolean | string = false): Promise<boolean> => {
    return await new Promise(async (resolve , reject) => {
        let opt :  SpawnSyncReturns<string> | undefined;
        let isFail : boolean;
        if(process.platform == 'win32'){
            opt = await spawnSync('go' , [] , {encoding: 'utf-8' , shell: true})
            isFail = (opt?.stderr?.includes(`is not recognized as an internal or external command`) || opt?.stdout?.includes(`command not found`)) ? true : false
        }else{
            opt= await spawnSync('which' , ['go'] , {encoding: 'utf-8' , shell: true})
            isFail = (opt?.stdout == '');
        }
        if(version && !isFail){
            // convert version from command to string
            let optVer: string | undefined = opt?.stdout?.split(' ')[2];
            optVer = optVer?.slice(2 , optVer.length);
            // convert all version to string version
            let ver: string = optVer ? optVer : '0.0.0';
            let parasVersion: string = typeof(version) == 'string' ? version : '1.1.1'
            if(compareVersions(ver , parasVersion) < 0){
                reject(`Version is lower and incompatible`)
            }
        }
        if(isFail){
            reject(`no golang on this computer, you need to install it first`)
        }
        resolve(true)
    })
}