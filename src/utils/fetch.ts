import axios from 'axios'
import Project from '../models/project'

export const getNodeList = async () : Promise<Array<Project>> => {
    return await new Promise(async (resolve , reject) => {
        await axios.get("https://raw.githubusercontent.com/onekill0503/dreamnode/main/manifest.json")
            .then(res => resolve(res.data))
            .catch(err => resolve([]))
    })
}