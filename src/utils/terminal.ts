import { spawn } from 'child_process'

export const run = (cmd : string) : void => {
    const cmdArgs: Array<string> = cmd.split(" ");
    const mainCmd: string = cmd.split(" ")[0];
    cmdArgs.shift();
    let child = spawn(mainCmd , cmdArgs);
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', function(data) {
        console.log(data);
    });
    child.stderr.on('data', function(data) {
        console.log(data);
    });
    child.on('close', function(code) {
    });
}