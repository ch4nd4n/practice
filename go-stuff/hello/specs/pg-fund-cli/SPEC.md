# SPEC - pg-fund-cli

## Commands
- `pgfund search --name <term>`
- `pgfund search --symbol <symbol>`

## Flags
- `--dsn <dsn>` optional; fallback to `PG_DSN` env var
- `--limit <n>` default `20`, max `100`
- `--format <table|json>` default `table`

## Behavior
- Use parameterized queries only.
- Apply limit bounds.
- Return stable column order.
- Handle connection failures with clear messages.

## Exit codes
- `0`: success
- `1`: usage/input error
- `2`: database connection/query error
