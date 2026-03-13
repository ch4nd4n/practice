# pnpm lockfile practices

**Doc style note:** keep entries short, action-oriented, and aligned with `agents.md` tone (fact-over-narrative).

## Commit the lockfile
- Always track `pnpm-lock.yaml`; the file ties every install to exact resolutions so CI, production, and local runs use the same tree.
- If you see lockfile churn, double-check that `package.json` and `pnpm-lock.yaml` both match before staging (resolve any manifest conflicts first).

## Keep installs deterministic
- CI/build bots should run `pnpm install --frozen-lockfile` so they fail fast when the lockfile is out of sync.
- Running `pnpm install` locally updates the lockfile; treat the diff as part of the same change that touched `package.json`.

## Handle merges safely
- pnpm can auto-resolve `pnpm-lock.yaml` merges; when conflicts appear, rerun `pnpm install`, review the updated lockfile, and commit the merged result.
- Always inspect the merged lockfile before staging because pnpm prefers the most recent data and may not choose the branch head you expect.
