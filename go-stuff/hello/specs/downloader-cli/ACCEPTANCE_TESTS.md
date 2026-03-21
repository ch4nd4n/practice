# Acceptance Tests - downloader-cli

## Scenario 1: successful download
Given a valid public file URL
When `downloader get <url> --out /tmp/file.bin`
Then command exits `0`
And file exists at `/tmp/file.bin`

## Scenario 2: invalid URL scheme
Given a `ftp://` URL
When command is run
Then command exits `1`
And stderr contains a scheme validation message

## Scenario 3: server unavailable
Given server returns 503 repeatedly
When retries are exhausted
Then command exits `2`
