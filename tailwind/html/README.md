# Tailwind

Using tailwind CSS with just HTML without any
JavaScript toolkit or library like React, Angular
Vue etc.

> Tailwind is a utility-first CSS library

## Getting started

Using Tailwind CSS with HTML

1. Install and init
2. Configure HTML to consume
3. Use Tailwind Classes
4. Consume it

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

```HTML:file=index.html
<link href="/dist/output.css" rel="stylesheet">
```

Start using Tailwind CSS classes

```HTML:file=index.html
<main class="bg-slate-100 pt-5 pb-5">
  <div class="container m-auto">
    <!-- Hero Card-->
    <div class="ui-hero-card border-2 rounded-sm p-4">
      <h2 class="text-3xl">Hero Section</h2>
      <p>This paragraph needs a photo section</p>
    </div>
  </div>
</main>
```
