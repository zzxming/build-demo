# Reproduction

1. Run bundle command

```bash
pnpm dev
# or
pnpm build
```

2. Open `docs/index.html`
3. Press `F12`
4. Click `log` button

# Expected

`log` button should log `C div#container`

# Actual

`log` button logs `C undefined`

# Additional context

Use `@rollup/plugin-typescript` can solve this problem

Or, comment `declare domNode: HTMLElement;` in `src/index.ts` can also solve this problem
