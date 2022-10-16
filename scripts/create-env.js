const fs = require("fs");
// crea el archivos para apartir de un condo de npm
fs.writeFileSync("./.env", `API=${process.env.API}\n`);
