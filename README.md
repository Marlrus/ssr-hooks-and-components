# NextJS TS Setup

1. rm -rf .git
2. rm yarn.lock
3. git init
4. npm i -D typescript @types/react @types/node prettier @types/node-sass @types/react-dom
5. npm i sass env-cmd
6. touch tsconfig.json prettier.config.js .env.development .env.local .env.production
7. mkdir atoms molecules organisms sections hooks contexts services types utils
8. npm run dev

## File mods

### package.json

```json
  "scripts": {
    "dev": "next dev",
    "build": "env-cmd -f .env.production next build",
    "build:dev": "env-cmd -f .env.development next build",
    "build:local": "env-cmd -f .env.local next build",
    "start": "next start"
  },
```

### tsconfig.json

```json
    "baseUrl": ".",
```

### prettier.config.js

```javascript
module.exports = {
  printWidth: 80,
  tabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  tabWidth: 2,
};
```
