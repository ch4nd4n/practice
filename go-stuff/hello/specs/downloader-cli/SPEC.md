# SPEC - downloader-cli

## Commands
- `downloader get <url> --out <path>`

## Flags
- `--out <path>` required output file path
- `--timeout <duration>` default `30s`
- `--retries <n>` default `2`
- `--resume` optional, continue partial download when possible

## Behavior
- Validate URL scheme: only `http`/`https`.
- Create parent directories for output path if missing.
- Retry transient network failures.
- Return deterministic exit codes.

## Exit codes
- `0`: success
- `1`: usage/input error
- `2`: network/server error
- `3`: filesystem write error
