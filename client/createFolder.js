const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const INIT_PATH = "./src/components/";

async function addFiles(name) {
  const filenames = name.split("/");
  const filename = filenames[filenames.length - 1];
  const currentPath = INIT_PATH + `${name}/`;
  const index = `import ${filename} from './${filename}';\nexport default ${filename}`;
  const main = `import React from 'react';\nimport s from './${filename}.module.css'\ninterface ${filename}Props{}\n\nconst ${filename}: React.FC<${filename}Props> = ({}) => {\nreturn <> </>\n};\nexport default ${filename};`;
  if (!fs.existsSync(currentPath)) {
    await new Promise((resolve, reject) => {
      fs.mkdir(currentPath, { recursive: true }, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  } else {
    throw "Folder already exists";
  }
  Promise.all([
    insertInFile(currentPath + `${filename}.module.css`, ""),
    insertInFile(currentPath + `${filename}.tsx`, main),
    insertInFile(currentPath + "index.ts", index),
  ])
    .then(() => {
      console.log("created");
    })
    .catch((err) => {
      throw err;
    });
}

async function insertInFile(path, content) {
  await new Promise((resolve) => {
    fs.open(path, "w", (err) => {
      if (err) throw err;
      resolve();
    });
  });
  await new Promise((resolve) => {
    fs.writeFile(path, content, (err) => {
      if (err) throw err;
      resolve();
    });
  });
}

rl.on("line", function (input) {
  addFiles(input)
    .then(rl.close())
    .catch((err) => {
      console.log(err);
      rl.close();
    });
});
