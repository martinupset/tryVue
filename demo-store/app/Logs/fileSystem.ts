const fs = require("fs")
const path = require("path")
const pathName = path.join(__dirname, '/logs.txt')


export const writeLogs = (data) => {
    try {
        if (fs.existsSync(pathName)) {
            fs.appendFile(pathName, data, 'utf-8', (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('log added.')
                }
            })
        } else {
            fs.writeFile(pathName, data, 'utf-8', (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('log added.')
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}