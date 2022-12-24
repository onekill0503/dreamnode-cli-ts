import inquirer from "inquirer";
import depedencyError from "../errors/depedencyError";
import Project from "../models/project";
import { isDepedencyInstalled } from "../utils/validation";
import isValidVersion from "../utils/version/golang";

const IBC = async (node: Project): Promise<void> => {
    return await new Promise(async (resolve,reject) => {
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
        
    })
}

export default IBC;