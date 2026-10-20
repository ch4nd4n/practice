#!/usr/bin/env bash
set -euo pipefail

# Skip manually when needed (e.g. emergency hotfix)
if [[ "${SKIP_SECRET_SCAN:-}" == "1" ]]; then
  echo "[secret-scan] Skipped (SKIP_SECRET_SCAN=1)"
  exit 0
fi

# Prefer gitleaks when available
if command -v gitleaks >/dev/null 2>&1; then
  echo "[secret-scan] Running gitleaks on staged changes..."
  if ! gitleaks protect --staged --redact --verbose; then
    echo "[secret-scan] Potential secret detected by gitleaks."
    echo "[secret-scan] Remove secret or rotate credentials before committing."
    exit 1
  fi
  exit 0
fi

# Fallback scanner (regex based) if gitleaks is not installed
echo "[secret-scan] gitleaks not found, using fallback regex scan..."

# Only scan added lines from staged diff
added_lines="$(git diff --cached --unified=0 --no-color | grep '^+' | grep -v '^+++ ' || true)"

if [[ -z "$added_lines" ]]; then
  exit 0
fi

# Allow explicit ignore for known-safe test fixtures
filtered_lines="$(printf '%s\n' "$added_lines" | grep -v 'secret-scan:allow' || true)"

if [[ -z "$filtered_lines" ]]; then
  exit 0
fi

patterns=(
  'AKIA[0-9A-Z]{16}'
  'ASIA[0-9A-Z]{16}'
  '-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----'
  'ghp_[A-Za-z0-9]{36}'
  'github_pat_[A-Za-z0-9_]{82,}'
  'xox[baprs]-[A-Za-z0-9-]{10,}'
  '(?i)(api[_-]?key|secret|token|password)[[:space:]]*[:=][[:space:]]*["'\''`]?[A-Za-z0-9_\-\/=+]{16,}'
)

for pattern in "${patterns[@]}"; do
  if printf '%s\n' "$filtered_lines" | grep -E -q -- "$pattern"; then
    echo "[secret-scan] Potential secret pattern detected: $pattern"
    echo "[secret-scan] Commit blocked."
    echo "[secret-scan] If this is a false positive, annotate line with: secret-scan:allow"
    exit 1
  fi
done

echo "[secret-scan] OK"
