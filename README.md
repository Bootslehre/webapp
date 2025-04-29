# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

### Scheine

#### SBF See

- komplett: 72 Basisfragen + 213 Seefragen + Navigationsaufgaben
- wenn SBF Binnen (Motor) vorhanden ist: 213 Seefragen + Navigationsaufgaben

#### SBF Binnen

- komplett (motor + segel)
  - 72 Basisfragen + 181 Binnenfragen + 47 Segelfragen
- SBF-Binnen unter Antriebsmaschine (Motor) und unter Segel für Inhaber des SBF-See
  - 181 Binnenfragen + 47 Segelfragen
- SBF-Binnen nur unter Antriebsmaschine (Motor)
  - 72 Basisfragen + 181 Binnenfragen
- SBF-Binnen nur unter Antriebsmaschine (Motor) für Inhaber des SBF-See
  - 181 Binnenfragen
- SBF-Binnen nur unter Segel
  - 52 Basisfragen (ohne Motor-Fragen) + 158 Binnenfragen (ohne Motor-Fragen) + 47 Segelfragen
- SBF-Binnen nur unter Segel für Inhaber des SBF-See
  - 158 Binnenfragen (ohne Motor-Fragen) + 47 Segelfragen
- SBF-Binnen unter Segel für Inhaber des SBF-Binnen unter Antriebsmaschine (Motor)
  - 47 Segelfragen
- SBF-Binnen nur unter Antriebsmaschine (Motor) für Personen, die den SBF-Binnen unter Segel vor dem 1. Mai 2012 erworben haben
  - 72 Basisfragen
  