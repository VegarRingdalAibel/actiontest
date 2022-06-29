/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { readFile, spawner, logInfo, logError } = require("./utils");
const { v4: uuidv4 } = require('uuid');

const makeRelease = async () => {

  logInfo(`About to make branch/release commit:`, "green");


  const branch = uuidv4();

  const err1 = await spawner(
    "git",
    ["create", "branch", `${branch}`],
    process.cwd(),
    true
  );

  if (err1) {
    logError(`\nUnable to create branch: ${err1}\n`, "green");
    return
  }

  const err2 = await spawner(
    "git",
    ["checkout", "branch", `${branch}`],
    process.cwd(),
    true
  );

  if (err2) {
    logError(`\nUnable to checkout branch: ${err2}\n`, "green");
    return
  }

  const err3 = await spawner(
    "git",
    ["commit", "--allow-empty", "--m", `"chore: generate release"`],
    process.cwd(),
    true
  );

  if (err3) {
    logError(`\nUnable to create commit: ${err3}\n`, "green");
    return 
  } 


  const err4 = await spawner(
    "git",
    ["push"],
    process.cwd(),
    true
  );

  if (err4) {
    logError(`\nUnable to push: ${err3}\n`, "green");
    return 
  } 

  logInfo(`Release done`, "green");
};
makeRelease();
