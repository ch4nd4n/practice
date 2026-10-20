import { ulid, monotonicFactory } from 'ulid'
import { randomUUID, randomBytes, randomInt } from 'crypto'

// ULID — sortable, URL-safe
console.log('--- ULID ---')
for (let i = 0; i < 5; i++) console.log(ulid())

// Monotonic ULID — guaranteed order within same ms
console.log('\n--- Monotonic ULID ---')
const mUlid = monotonicFactory()
for (let i = 0; i < 5; i++) console.log(mUlid())

// UUID v4 — built-in
console.log('\n--- UUID v4 ---')
for (let i = 0; i < 5; i++) console.log(randomUUID())

// Random hex string
console.log('\n--- Random hex (16 bytes) ---')
for (let i = 0; i < 5; i++) console.log(randomBytes(16).toString('hex'))

// Random int (0–1M)
console.log('\n--- Random int (0–1M) ---')
for (let i = 0; i < 5; i++) console.log(randomInt(0, 1_000_000))
