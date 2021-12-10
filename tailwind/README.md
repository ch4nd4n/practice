# Tailwind

Practicing Tailwind CSS.

## Getting started

Using Tailwind CSS with HTML

1. Install and init
2. Configure Template path
3. Create CSS
4. Build it
5. Consume it

https://tailwindcss.com/docs/installation

1. Install and init

```bash
npm init -y
npm install -D tailwindcss
npx tailwindcss init
mkdir src
```

2. Configure tailwind

```javascript:file=tailwind.config.js
content: ["./src/**/*.{html,js}"]
```

Tells tailwind which file to process

3. Create CSS

```bash
touch src/input.css
```

4. Start Tailwind CLI build

```bash
mkdir dist
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

5. Consume it

Inside your HTML

```bash
touch src/index.html
```

```index.html
<link href="/dist/output.css" rel="stylesheet">
```

6. Improving the development workflow

?
