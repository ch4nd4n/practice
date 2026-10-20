# Unique Identifier Generation in JavaScript

## ULID

**Universally Unique Lexicographically Sortable Identifier**

- 128-bit: 48-bit timestamp + 80-bit randomness
- Monotonically sortable (unlike UUID v4)
- Crockford Base32 encoded — 26 chars, URL-safe, case-insensitive
- Format: `01ARZ3NDEKTSV4RRFFQ69G5FAV`

## Install

```bash
npm install ulid
```

## Usage

```js
import { ulid, monotonicFactory } from 'ulid'

// Basic — new ULID per call
ulid()                     // '01HXYZ...'

// Seeded timestamp
ulid(1713830400000)        // deterministic prefix

// Monotonic — guaranteed sort order within same ms
const mUlid = monotonicFactory()
mUlid()                    // safe for bulk inserts
mUlid()                    // incremented, same ms
```

## Alternatives

### UUID v4 (built-in, Node 14.17+)

```js
import { randomUUID } from 'crypto'
randomUUID()               // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
```

### Random hex string

```js
import { randomBytes } from 'crypto'
randomBytes(16).toString('hex')   // 32-char hex
```

### Random integer in range

```js
import { randomInt } from 'crypto'
randomInt(0, 1_000_000)    // cryptographically secure
```

## Comparison

| | ULID | UUID v4 | `randomBytes` |
|---|---|---|---|
| Sortable | Yes | No | No |
| URL-safe | Yes | No (dashes) | Configurable |
| Dependency | `ulid` | built-in | built-in |
| Entropy (bits) | 80 | 122 | `n * 8` |

## When to use ULID

- Primary keys in DBs where insertion order matters
- Distributed ID generation without coordination
- Preference for human-readable, copy-safe IDs
