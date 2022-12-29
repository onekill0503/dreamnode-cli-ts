
import chalk from 'chalk';
import { runSpawn as terminal } from '../terminal'
import {  validate } from 'compare-versions'
import { Spinner, createSpinner as spinner } from "nanospinner";

export const installGo = async (spin: Spinner ,version: string = "1.9"): Promise<void> => {
    if(!validate(version)){
        throw new Error(`Invalid Version`);
    }
    // create loading spinner
    spin.update({text:chalk.yellow(`Downloading golang version ${version}...`)})
    await terminal(`wget https://golang.org/dl/go${version}.linux-amd64.tar.gz` , spin)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.update({text:chalk.yellow("Remove current golang...")})
    await terminal(`rm -rf /usr/local/go` , spin)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.update({text:chalk.yellow("Installing downloaded golang...")})
    await terminal(`tar -C /usr/local -xzf "go${version}.linux-amd64.tar.gz"` , spin)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.update({text:chalk.yellow("Remove downloaded golang...")})
    await terminal(`rm "go${version}.linux-amd64.tar.gz"` , spin)
        .then(([res , err]) => {
            if(!err) throw new Error(res)
        }).catch(err => {throw new Error(err)})
    spin.update({text:chalk.yellow("Extract downloaded golang...")})
    if(!process.env.PATH?.includes("$HOME/go/bin")){
        await terminal(`echo "export PATH=${process.env.PATH}:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile` , spin)
            .then(([res , err]) => {
                if(!err) throw new Error(res)
            }).catch(err => {throw new Error(err)})
    }
    spin.update({text: chalk.green(`Successfully installing golang version ${version}\nYou should restart your terminal.`)})    
}