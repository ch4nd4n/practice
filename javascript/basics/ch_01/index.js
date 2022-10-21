const { ulid } = require("ulid");

for (let index = 0; index < 50; index++) {
    const element = ulid();
    console.log(element);
}