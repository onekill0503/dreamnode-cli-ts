import { runSpawn as terminal } from "../terminal";
import { createSpinner as spinner} from 'nanospinner'

const install = async () => {
    // create loading spinner
    let spin = spinner(`Installing basic depedency...`).start();
    await terminal(`apt update`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    await terminal(`apt upgrade -y`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    await terminal(`apt install curl build-essential git wget jq make gcc tmux chrony -y`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.success({text:`Success intalling basic depedency!`})
}

export default install;