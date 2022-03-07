# themoviedb-client

Technical test for a job application

## Quick notes

This project showcases some cool functional programming concepts but doesn't take full advantage of them:
API calls are not properly isolated and the whole project is basically untested.

I pushed Typescript's linter very far with that `Maybe` type, and I don't see a way to clean up the `MovieView.vue`
situation other than using TSX to benefit from that sweet `caseOf` syntax. Stay tuned for the TSX branch!

Because Tailwind preprocesses your code to generate style sheets, you can't create dynamic class names,
which means it is impossible to set an image fetched in real time as a background in a pure "Tailwind" way.
I resorted to using absolute-positioned `img` tags, as you can find in `BaseCard.vue` for instance, but in real life I would probably use inline styles for that kind of situation.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
