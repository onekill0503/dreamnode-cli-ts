import axios from 'axios'
import Project from '../models/project'

export const getNodeList = async () : Promise<Array<Project>> => {
    return await new Promise(async (resolve , reject) => {
        await axios.get("https://raw.githubusercontent.com/onekill0503/dreamnode/main/manifest.json")
            .then(res => resolve(res.data))
            .catch(err => resolve([]))
    })
}
export const getPeers = async (url: string): Promise<any> => {
    const peers: string = await axios.get(url).then((res: any) => res.data.replace(/(\n)/g , ","))
    return peers;
}
export const getStateSyncData = async (rpc: string): Promise<any> => {
    const latestHeight: string = await axios.get(`${rpc}/block`).then(res => res.data.result.block.header.height).catch(e => 0);
    const trust_height: number = parseInt(latestHeight) - 5000;
    const trust_hash: string = await axios.get(`${rpc}/block?height=${trust_height}`).then(res => res.data.result.block_id.hash);
    return [trust_height , trust_hash];
}