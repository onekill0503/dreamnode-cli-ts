import { SpawnSyncReturns, spawnSync , spawn, ChildProcess } from 'child_process'
import { sleep } from '.';
import chalk from 'chalk';

export const run = async (cmd : string , show: boolean = false) : Promise<[string , boolean]> => {
    return await new Promise(async (resolve , reject) => {
        if(cmd.length > 0){
            // get command argument
            const cmdArgs: Array<string> = cmd.split(" ");
            // get main command
            const mainCmd: string = cmd.split(" ")[0];
            cmdArgs.shift();
            let opt : SpawnSyncReturns<string | Buffer> = await spawnSync(mainCmd , cmdArgs , { encoding: 'utf-8' , shell:true})
            // print output from command
            if(show){
                console.log(opt.stdout);
                console.log(opt.stderr);
            }
            // if got error return false
            if(opt.error) resolve([`Failed running "${cmd}"`,false]);
            // if not return true
            resolve([`Successfully running "${cmd}"`,true]);
        }else {
            // got empty string , come to this.
            reject(`Got empty string`)
        }
    })
}
export const runSpawn = async (cmd : string) : Promise<[string , boolean]> => {
    return await new Promise(async (resolve , reject) => {
        if(cmd.length > 0){
            let err = false;
            // get command argument
            const cmdArgs: Array<string> = cmd.split(" ");
            // get main command
            const mainCmd: string = cmd.split(" ")[0];
            cmdArgs.shift();
            const opt : ChildProcess = spawn(mainCmd , cmdArgs , { shell:true})
            opt.stdout?.setEncoding('utf-8');
            opt.stderr?.setEncoding('utf-8');
            opt.stdout?.on("data" , (data) => {
                console.log(data);
            })
            opt.stderr?.on("data" , (data) => {
                console.log(data);
            })
            opt.on('error' , (err) => {
                reject(err.message);
            })
            opt.on('exit' , (c , s) => {
                if(c) console.log(chalk.yellow(`Process exit with code: ${c}`))
                if(s) console.log(chalk.yellow(`Process exit with signal: ${s}`))
            });
            // if not return true
            if(err) resolve([`Failed running "${cmd}"`,false])
            else resolve([`Successfully running "${cmd}"`,true]);
        }else {
            // got empty string , come to this.
            reject(`Got empty string`)
        }
    })
}