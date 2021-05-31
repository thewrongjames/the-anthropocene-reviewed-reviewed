# The Anthropocene Reviewed Reviewed

Hopefully this will eventually be the source for a website where you review
different episodes of a podcast where John Green reviews different aspects of
the human-centred planet on a five star scale.

## Local Development

Start the react-scripts dev app with:

```bash
cd website
npm start
```

Start the firestore emulator with:

```bash
firebase emulators:start --only firestore
```

## TODO

- If I decide to pay for firebase functions:
  - Move summarisation there.
  - Implement some kind of CAPTCHA / reCAPTCHA / hCAPTCHA.
- Update `App.test.tsx` to at least function.
- Probably change to `npm ci` rather than `npm install` in github action.
- Develop a proper way to toggle emulator use.
- Set CSP headers on hosting as strict as possible.
- Add open graph protocol and twitter cards stuff.
- Add tests for the firestore rules.
