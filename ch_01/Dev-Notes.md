# Tutorial: Nodejs with Typescript, Eslint and Prettier

I am going to walk you through setting up nodejs project with Typescript, Eslint and prettier. This will help you scratch the surface of Typescript, linting and code formatting. This is not an indepth tutorial on Typescript
but give you an insight of things.

## Why Typescript?

For a long time I did not find Typescript enticing enough, to me, it was just another thing.
While I ignored typescript others did not. It grew leaps and bound.

This should be interesting one for people who use some framework which have these things pretty much baked in.

Compiling and executing

```bash
yarn init -y
yarn add typescript --dev
ls node_modules/.bin
```

Update package.json

```
"scripts": {
    "tsc": "tsc"
  },
```

```sh
mkdir src
touch src/index.ts
yarn tsc src/_.ts or npx tsc src/_.ts
node src/index.js
```

### Better management of Compiling and generated files

You may have realized that compiling using tsc spits out the generated
files in the same folder as the source. To fix that we can piggyback on
typescript config

init typescript config

```
yarn tsc --init
```

update `tsconfig.json` to keep source in `src` folder and output in `dist`

```sh
rm ./src/*.js
```

```json
"rootDir": "./src", /* Specify the root folder within your source files. */
"outDir": "./dist", /* Specify an output folder for all emitted files. */
```

```json:title=package.json
  "scripts": {
    "start": "node dist/index.js",
    "tsc": "tsc"
  },
```

```bash
yarn start
```

#### Add linter

https://eslint.org/docs/user-guide/getting-started

```sh
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

```
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · node
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
```

```json:title=package.json
"lint": "eslint",
```

now lets lint source

```bash
yarn lint src/*.ts
```

```
yarn add -D prettier
yarn prettier --check .
```

Above would give some errors

```
Checking formatting...
[warn] .eslintrc.js
[warn] src/index.ts
[warn] tsconfig.json
[warn] Code style issues found in the above file(s). Forgot to run Prettier?
```

You could fix above using something like

```
yarn prettier --write .
git diff
```

Although if you do a linting, you would see an error

```
yarn lint
```

```lint
2:13  error  Strings must use singlequote  quotes
```

This is due to conflicting default rules of prettier with eslint. To fix this, we can update
prettier to use eslint rules instead.

```bash
yarn add -D eslint-plugin-prettier
```

Update `.prettierrc.json`

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Finally test out if prettier and eslint is working good.

Open `index.ts` and update it with some linting issue

For example if we change it to something like

```diff
-console.log('hello');
+console.log('hello')
```

Now lint it

```
yarn lint
```

It should error out to something like

```
  2:21  error  Insert `;⏎`                                    prettier/prettier
  2:21  error  Newline required at end of file but not found  eol-last
  2:21  error  Missing semicolon                              semi
```

```
yarn prettier --check .
```

```
Checking formatting...
[warn] src/index.ts
[warn] Code style issues found in the above file(s). Forgot to run Prettier?
error Command failed with exit code 1.
```

Enable and disable prettier plugin to test out things.

Over and out for this one.

# Bonus

- Set up your code editor
- Git Hooks
