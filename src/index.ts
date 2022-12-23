#!/usr/bin/env node
import { isDepedencyInstalled } from './utils/validation'
import { installGo } from './utils/installs/golang'
import chalk from 'chalk'
import inquirer from 'inquirer'
import installBasic from './utils/installs/basic'

(async () => {
    await installBasic();
    await isDepedencyInstalled(`go`)
        .then((res: boolean) => {

        }).catch(async (err: string) => {
            console.log(chalk.red(err))
            const installQ = await inquirer.prompt({
                type: 'confirm',
                message: `would you like to install golang ?`,
                name: `answer`
            })
            if(installQ.answer){
                try{
                    await installGo();
                }catch(err){
                    process.exit(0);
                }
            }
        })
})()