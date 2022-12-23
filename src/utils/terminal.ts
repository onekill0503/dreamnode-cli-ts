import { rejects } from 'assert'
import { SpawnSyncReturns, spawnSync } from 'child_process'
import { resolve } from 'path'

export const run = async (cmd : string) : Promise<[string , boolean]> => {
    return await new Promise(async (resolve , reject) => {
        if(cmd.length > 0){
            // get command argument
            const cmdArgs: Array<string> = cmd.split(" ");
            // get main command
            const mainCmd: string = cmd.split(" ")[0];
            cmdArgs.shift();
            let opt : SpawnSyncReturns<string | Buffer> = await spawnSync(mainCmd , cmdArgs , { encoding: 'utf-8' , shell:true})
            // print output from command
            console.log(opt.stdout);
            console.log(opt.stderr);
            // if got error return false
            if(opt.error) resolve([`Successfully install golang`,false]);
            // if not return true
            resolve([`Successfully install golang`,true]);
        }else {
            // got empty string , come to this.
            reject(`Got empty string`)
        }
    })
}