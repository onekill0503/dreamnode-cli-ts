#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'
import installBasic from './utils/installs/basic'
import { getNodeList } from './utils/fetch'
import { checkUserInfo, searchValueFromArray as getData } from './utils'
import Project from './models/project'
import ibc from './nodes/ibc'
import NODE from './enums/node'

(async () => {
    await checkUserInfo();
    await installBasic();
    const nodeList: Array<Project> = await getNodeList();
    if(nodeList.length < 1) {
        console.log(chalk.red(`No availble node right now.`))
        process.exit(0);
    }
    const nodeToMenu: Array<string> = [...nodeList.map(v => v.name)];
    const nodeChoice: any = await inquirer.prompt({
        message: `Which node you want to install ?`,
        type: 'list',
        name: 'answer',
        choices: nodeToMenu
    });
    const nodeData: Project = getData(nodeList , nodeChoice?.answer , "name")
    if(nodeData == undefined){
        console.log(chalk.red(`Selected node is missing, try again later or contact the owner!`));
        process.exit(0);
    }
    // switch case for selected node
    switch(nodeData?.node_type){
        case NODE.IBC:
            const port = await inquirer.prompt({
                type: 'number',
                name: 'answer',
                message: 'please input node port : '
            });
            await ibc(nodeData , process.env.NODENAME || 'whoami' , port.answer)
        default:
            console.log(chalk.red(`No option for selected node !`))
            process.exit(0);
    }
})()