import inquirer from "inquirer";
import { runSpawn as cmd } from "./terminal";
import chalk from "chalk";
import toml from 'toml';
import fs from 'fs'
import path from "path";
const json2toml = require('json2toml');

export const searchValueFromArray = (
    data: Array<any>,
    k: string,
    attr: string
    ): any => {
    return data.filter(d => {
        if(d[attr] == k) return d;
    })[0];
}
export const sleep = async (T: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, T));
}
export const checkUserInfo = async (): Promise<void> => {
    if(process.env.NODENAME == undefined){
        const nodename = await inquirer.prompt({
            type:"input",
            message: "Please input your node name : ",
            name: 'answer',
            validate(d){
                return d == '' ? chalk.red('Field not allowed to be blank !') : true
            }
        })
        await cmd(`echo "export NODENAME=${nodename.answer}" >> $HOME/.bash_profile`)
        process.env.NODENAME = nodename.answer;
    }
    if(process.env.WALLET == undefined){
        const walletname = await inquirer.prompt({
            type:"input",
            message: "Please input your wallet name : ",
            name: 'answer',
            validate(d){
                return d == '' ? chalk.red('Field not allowed to be blank !') : true
            }
        })
        await cmd(`echo "export WALLET=${walletname.answer}" >> $HOME/.bash_profile`)
        process.env.NODENAME = walletname.answer;
    }
}
export const readToml = async (file: string): Promise<any> => {
    if(!(fs.existsSync(path.join(file)))) return false;
    const tomlData: string = await fs.readFileSync(path.join(__dirname , file) , {
        encoding: 'utf-8'
    });
    const tomlJson = toml.parse(tomlData);
    return tomlJson;
}
export const writeToml = async (target: string , data: any) : Promise<void> => {
    await fs.writeFileSync(path.join(target) , json2toml(data));
}