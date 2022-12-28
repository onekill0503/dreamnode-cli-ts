import inquirer from "inquirer";
import depedencyError from "../errors/depedencyError";
import Project from "../models/project";
import { isDepedencyInstalled } from "../utils/validation";
import isValidVersion from "../utils/version/golang";
import { createSpinner } from "nanospinner";
import chalk from "chalk";
import { runSpawn as cmd } from "../utils/terminal"
import axios from "axios";
import { readToml, writeToml } from "../utils";

const getPeers = async (url: string): Promise<any> => {
    const peers: string = await axios.get(url).then((res: any) => res.data.replace(/(\n)/g , ","))
    return peers;
}
const configureNodeConfig = async (file: string , node: Project , port: number) : Promise<void> => {
    let tomlData = await readToml(file);
    tomlData.p2p.persistent_peers = await getPeers(node.peers);
    tomlData.rpc.laddr = `tcp://0.0.0.0:${port}`;
    tomlData.rpc.cors_allowed_origins = ["*"]
    const newConfig = await axios.get(node.repo.config.configUrl)
        .then(res => {
            if(res?.data) return res.data
            else return {};
        })
        .catch(err => {
            return {}
        })
    tomlData = {...tomlData , newConfig}
    await writeToml(file , tomlData);
}
const configureNodeApp = async (file: string , node: Project) : Promise<void> => {
    let appData = await readToml(file);
    const newConfig = await axios.get(node.repo.config.configUrl)
        .then(res => {
            if(res?.data) return res.data
            else return {};
        })
        .catch(err => {
            return {}
        })
    appData = {...appData , newConfig};
    await writeToml(file , appData);
}
const createService = async(binary: string , nodeDir: string): Promise<any> => {
    try{
        const serviceCmd = `tee /etc/systemd/system/${binary}.service > /dev/null <<EOF\n[Unit]\nDescription=${nodeDir}\nAfter=network-online.target\n[Service]\nUser=$USER\nExecStart=$(which ${binary}) start --home $HOME/.${nodeDir}\nRestart=on-failure\nRestartSec=3\nLimitNOFILE=65535\n[Install]\nWantedBy=multi-user.target\nEOF`
        await cmd(serviceCmd);
        await cmd("systemctl daemon-reload");
        await cmd(`systemctl enable ${binary}`);
        await cmd(`systemctl restart ${binary}`);
        return true;
    }catch(err: any) {
        console.log(err.message);
        return false;
    }
}
const IBC = async (node: Project , nodename: string , port: number): Promise<void> => {
    return await new Promise(async (resolve,reject) => {
        const spin = createSpinner(chalk.yellow("Installing Node...")).start();
        let binaryName: string = '';
        let nodeDir: string = '';
        if(!node.repo.build){
            spin.update({text: chalk.yellow("Downloading Binary...")})
            try{
                await cmd(`wget ${node.repo.url}` , spin)
                    .then(res => {
                        if(!res[1]) throw new Error(res[0]);
                    })
                    .catch((err: any) => {
                        throw new Error(err)
                    });
                spin.update({text: chalk.yellow("Extracting File...")})
                const parseUrl: string[] = node.repo.url.split("/")
                const tarFileName: string = parseUrl[parseUrl.length-1];
                await cmd(`tar -xvf ${tarFileName}` , spin)
                    .then(res => {
                        if(!res[1]) throw new Error(res[0]);
                    })
                    .catch((err: any) => {
                        throw new Error(err)
                    });
                spin.update({text: chalk.yellow("Installing ...")})
                const parseDir : string[] | undefined = node.repo.dir?.split("/");
                binaryName = parseDir ? parseDir[parseDir.length-1] : "";
                const bNArr: string[] = binaryName.split("");
                bNArr.pop();
                nodeDir= bNArr.join("");
                await cmd(`mv ${node.repo.dir} /usr/local/bin/${binaryName} && rm -rf ${tarFileName} && rm -rf ${node.repo.dir}` , spin)
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
        spin.update({text: chalk.yellow("Node Initialization...")})
        await cmd(`${binaryName} config chain-id ${node.chain} && ${binaryName} config keyring-backend test` , spin);
        await cmd(`${binaryName} init ${nodename} --chain-id ${node.chain}`)
        await cmd(`curl ${node.repo.genesis} | jq .result.genesis > ~/.${nodeDir}/config/genesis.json` , spin)
        await cmd(`cp $HOME/.${nodeDir}/config/config.toml $HOME/.${nodeDir}/config/config.toml.backup`)
        // configuration server
        spin.update({text: chalk.yellow("Configuration Node ...")})
        await configureNodeConfig("$HOME/.${nodeDir}/config/config.toml" , node , port);
        await configureNodeApp("$HOME/.${nodeDir}/config/app.toml" , node);
        spin.update({text: chalk.yellow("Create Node Service...")})
        const createServiceRes: any = await createService(binaryName , nodeDir);
        if(!createServiceRes){
            spin.error({text:chalk.red(`Failed install ${node.name} Service`)});       
        }else{
            spin.success({text:chalk.green(`Successfully Installing ${node.name}`)});
        }
    })
}

export default IBC;