import { Spinner } from "nanospinner";
import Project from "../../models/project";
import { readToml, writeToml } from "..";
import { runSpawn as cmd } from "../terminal";
import { getStateSyncData } from "../fetch";

export const install = async (node: Project ,binary: string , nodeDir: string , spin: Spinner) : Promise<void> => {
    // geting trust hash and height
    let rpcUrl = node?.repo?.rpc || '';
    if(rpcUrl == '') throw new Error(`RPC url is undefined !`);
    const [trust_height , trust_hash] = await getStateSyncData(rpcUrl);
    const tomlData = await readToml(`${process.env.HOME}/.${nodeDir}/config/config.toml`);
    // load and update config.toml
    if(tomlData == '') throw new Error(`Can't Read config.toml`);
    tomlData.statesync.enable = true;
    tomlData.statesync.trust_hash = trust_hash;
    tomlData.statesync.trust_height = trust_height;
    tomlData.statesync.rpc_servers = `${node.repo.rpc},${node.repo.rpc}`
    await writeToml(`${process.env.HOME}/.${nodeDir}/config/config.toml` , tomlData);
    // restart the service
    await cmd(`systemctl restart ${binary}`);
}