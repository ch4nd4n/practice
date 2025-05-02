npx tailwindcss init

Edit `tailwind.config.js` with following

```JSON
content: ["./src/**/*.{html,js}"],
```

```sh
mkdir src
touch src/input.css
```

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create HTML file

```HTML
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/dist/output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

https://tailwindcss.com/docs/installation/tailwind-cli

```
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
npx serve
```
