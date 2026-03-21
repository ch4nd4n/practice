# Acceptance Tests - pg-fund-cli

## Scenario 1: search by name
Given Postgres contains funds matching `alpha`
When `pgfund search --name alpha --limit 5`
Then exits `0`
And returns at most 5 rows

## Scenario 2: DSN missing
Given no `--dsn` and `PG_DSN` unset
When command runs
Then exits `1`
And prints DSN guidance

## Scenario 3: database unavailable
Given invalid DSN
When command runs
Then exits `2`
And prints connection failure reason
