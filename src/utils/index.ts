import inquirer from "inquirer";
import { runSpawn as cmd } from "./terminal";
import chalk from "chalk";

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
    return new Promise(async (resolve , reject) => {
        if(process.env.NODENAME == undefined){
            const nodename = await inquirer.prompt({
                type:"input",
                message: "Please input your node name : ",
                name: 'answer',
                validate(d){
                    return d == '' ? chalk.red('Field not allowed to be blank !') : true
                }
            })
            await cmd(`export NODENAME=${nodename.answer} >> $HOME/.bash_profile`)
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
            await cmd(`export WALLET=${walletname.answer} >> $HOME/.bash_profile`)
            process.env.NODENAME = walletname.answer;
        }
    })
}