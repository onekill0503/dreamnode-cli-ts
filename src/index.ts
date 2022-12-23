#!/usr/bin/env node
import { isDepedencyInstalled , installGo } from './utils/validation'
import chalk from 'chalk'
import inquirer from 'inquirer'

(async () => {
    await isDepedencyInstalled()
        .then((res: boolean) => {

        }).catch(async (err: string) => {
            console.log(chalk.red(err))
            const installQ = await inquirer.prompt({
                type: 'confirm',
                message: `would you like to install golang ?`,
                name: `answer`
            })
            if(installQ.answer){
                await installGo();
            }
        })
})()