#!/usr/bin/env node
import { isDepedencyInstalled } from './utils/validation'

(async () => {
    await isDepedencyInstalled()
        .then((res: boolean) => {
            console.log(res)
        }).catch((err: string) => {
            console.log(err)
        })
})()