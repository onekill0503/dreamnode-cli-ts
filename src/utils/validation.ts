import { SpawnSyncReturns , spawnSync } from "child_process";
import {  compareVersions , validate } from 'compare-versions'
import { run as terminal } from './terminal'
import { createSpinner as spinner } from "nanospinner";

export const isDepedencyInstalled = async (version: boolean | string = false): Promise<boolean> => {
    return await new Promise(async (resolve , reject) => {
        let opt :  SpawnSyncReturns<string> | undefined;
        let isFail : boolean;
        if(process.platform == 'win32'){
            opt = await spawnSync('go' , [] , {encoding: 'utf-8' , shell: true})
            isFail = (opt?.stderr?.includes(`is not recognized as an internal or external command`) || opt?.stdout?.includes(`command not found`)) ? true : false
        }else{
            opt= await spawnSync('which' , ['gos'] , {encoding: 'utf-8' , shell: true})
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

export const installGo = async (version: string = "1.9"): Promise<void> => {
    if(!validate(version)){
        throw new Error(`Invalid Version`);
    }
    // create loading spinner
    let spin = spinner(`Downloading golang version ${version}...`).start();
    terminal(`wget https://golang.org/dl/go${version}.linux-amd64.tar.gz`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        })
    spin.update({text:"Remove current golang..."})
    terminal(`sudo rm -rf /usr/local/go`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        })
    spin.update({text:"Installing downloaded golang..."})
    terminal(`sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        })
    spin.update({text:"Remove downloaded golang..."})
    terminal(`rm "go${version}.linux-amd64.tar.gz"`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        })
    spin.update({text:"Extract downloaded golang..."})
    terminal(`echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        })
    spin.success({text: `Successfully installing golang version ${version}\nYou should restart your terminal.`})
    
}