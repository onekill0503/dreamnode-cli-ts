
import { runSpawn as terminal } from '../terminal'
import {  validate } from 'compare-versions'
import { createSpinner as spinner } from "nanospinner";

export const installGo = async (version: string = "1.9"): Promise<void> => {
    if(!validate(version)){
        throw new Error(`Invalid Version`);
    }
    // create loading spinner
    let spin = spinner(`Downloading golang version ${version}...`).start();
    await terminal(`wget https://golang.org/dl/go${version}.linux-amd64.tar.gz`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.update({text:"Remove current golang..."})
    await terminal(`rm -rf /usr/local/go`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.update({text:"Installing downloaded golang..."})
    await terminal(`tar -C /usr/local -xzf "go${version}.linux-amd64.tar.gz"`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.update({text:"Remove downloaded golang..."})
    await terminal(`rm "go${version}.linux-amd64.tar.gz"`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.update({text:"Extract downloaded golang..."})
    await terminal(`echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile`)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.success({text: `Successfully installing golang version ${version}\nYou should restart your terminal.`})
    
}