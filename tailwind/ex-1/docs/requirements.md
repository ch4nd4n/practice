### Project: CLI-Terminal Chat UI (Vanilla)

**Core Stack:** Vite, Vanilla JS, Tailwind CSS.

---

### 1. Architecture & Routing

* **Pattern:** Multi-Page Application (MPA).
* **Vite Config:** Define `rollupOptions.input` for `index.html`, `/account`, `/about`, and `/help`.
* **HMR:** Ensure CSS and JS hot-reloading across all entry points.
* **Directory:** Root-level HTML files for clean URL mapping (`/about/index.html`).

---

### 2. UI/UX Requirements (Tailwind)

* **Theme:** Matrix/CRT aesthetics. `bg-zinc-950`, `text-emerald-500`, `font-mono`.
* **Global Styles:** * Custom scanline overlay (fixed, pointer-events-none).
* Blinking block cursor animation for inputs.
* Subtle `text-shadow` for "glow" effect.


* **Layout:** * Main: Scrollable output buffer (`flex-1`), sticky bottom input line.
* Navigation: Header/Nav mimicking terminal tabs or directory paths (`~/root/account`).



---

### 3. Functional Requirements

* **Input Controller:**
* Capture `Enter` key.
* Append input to history buffer.
* Command Parser: Implement `switch` logic for `goto`, `clear`, `help`, and `cd`.


* **Navigation Logic:** * Map `goto [page]` or `cd [page]` to `window.location.href`.
* Support standard `<a>` tags styled as command strings.


* **Buffer Management:**
* Auto-scroll to bottom on new output.
* `clear` command to purge DOM nodes in the log container.



---

### 4. Components (Vanilla Patterns)

* **Log Entry:** Function-based template returning a DOM element with timestamp and source tags (`[SYSTEM]`, `[USER]`).
* **Input Row:** Non-native look; hidden real input synced to a visible "fake" span/cursor for styling control.

---

### 5. File Manifest

* `vite.config.js`: Multi-input configuration.
* `tailwind.config.js`: Custom animations (blink, pulse), CRT colors.
* `src/main.js`: Shared terminal logic, event bus for commands.
* `index.html`: Main chat/terminal entry.
* `account/index.html`: Settings/Profile view.
* `about/index.html`: Documentation/Info view.


