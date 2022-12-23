import { run as terminal } from "../terminal";
import { createSpinner as spinner} from 'nanospinner'

const install = () => {
    // create loading spinner
    let spin = spinner(`Installing basic depedency...`).start();
    terminal(`apt update`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    terminal(`apt upgrade -y`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    terminal(`apt install curl build-essential git wget jq make gcc tmux chrony -y`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.success({text:`Success intalling basic depedency!`})
}

export default install;