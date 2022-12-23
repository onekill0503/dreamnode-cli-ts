import { SpawnSyncReturns , spawnSync } from "child_process";
import {  compareVersions , validate } from 'compare-versions'
import { run as terminal } from './terminal'
import { createSpinner as spinner } from "nanospinner";

export const isDepedencyInstalled = async (program : string ,version: boolean | string = false): Promise<boolean> => {
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
            reject(`no ${program} on this computer, you need to install it first`)
        }
        resolve(true)
    })
}