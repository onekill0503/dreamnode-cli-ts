import inquirer from "inquirer";
import depedencyError from "../errors/depedencyError";
import Project from "../models/project";
import { isDepedencyInstalled } from "../utils/validation";
import isValidVersion from "../utils/version/golang";
import { createSpinner } from "nanospinner";
import chalk from "chalk";
import { runSpawn as cmd } from "../utils/terminal"

const IBC = async (node: Project): Promise<void> => {
    return await new Promise(async (resolve,reject) => {
        if(!node.repo.build){
            const spin = createSpinner(chalk.yellow("Downloading Binary...")).start();
            try{
                await cmd(`wget ${node.repo.url}`)
                    .then(res => {
                        if(!res[1]) throw new Error(res[0]);
                    })
                    .catch((err: any) => {
                        throw new Error(err)
                    });
                spin.update({text: chalk.yellow("Extracting File...")})
                const parseUrl: string[] = node.repo.url.split("/")
                const tarFileName: string = parseUrl[parseUrl.length-1];
                await cmd(`tar -xvf ${tarFileName}`)
                    .then(res => {
                        if(!res[1]) throw new Error(res[0]);
                    })
                    .catch((err: any) => {
                        throw new Error(err)
                    });
                spin.update({text: chalk.yellow("Installing ...")})
                const parseDir : string[] | undefined = node.repo.dir?.split("/");
                const binaryName : string = parseDir ? parseDir[parseDir.length-1] : "";
                await cmd(`mv ${node.repo.dir} /usr/local/bin/${binaryName} && rm -rf ${tarFileName} && rm -rf ${node.repo.dir}`)
                spin.success({text:chalk.green(`Successfully Installing ${node.name}`)});
                process.exit(0);
            }catch(err: any) {
                console.log(chalk.red(err.message));
                process.exit(0);
            }
        }else{
            await isDepedencyInstalled('go' , "1.9" , isValidVersion)
                .catch(async (err: depedencyError) => {
                    if(err.installable){
                        const install: Function = err.installation || (() => {});
                        const installQ = await inquirer.prompt({
                            type: 'confirm',
                            message: 'looks like we can help you to install it.\ndo you want to install with use ?',
                            name: 'answer'
                        });
                        if(installQ.answer){
                            await install();
                        }
                    }
                });
        }
        
        
    })
}

export default IBC;