import child_process from "child_process";
import fs from "fs";
import chalk from "chalk";

function startNodeProcess(filePath, fileName) {
    const node_process = child_process.spawn("node", [filePath]);

    node_process.stdout.on("data", (data) => {
        console.log(chalk.blue(`[${fileName}] `) + chalk.green(`${data}`) );
    });
    
    node_process.on("close", (code) => {
        console.log(chalk.blue(`[${fileName}] `) + chalk.red(`${code}`) );
    });

};

console.log(chalk.yellow("Starting Server..."));

fs.readdir("server/apis", (err, files) => {
    files.forEach((file) => {
        startNodeProcess(`server/apis/${file}`, file);
    });
});

startNodeProcess("server/index.js", "index.js");