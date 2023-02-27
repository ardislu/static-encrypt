# static-encrypt

A tool to encrypt any static content, and (optionally) create a basic password-protected frontend that can be hosted statically.

Like [staticrypt](https://github.com/robinmoisson/staticrypt) but uses the modern [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) instead of `crypto-js`.

See [static-encrypt-cli](https://github.com/ardislu/static-encrypt-cli) for a Rust CLI companion to this tool.

## How to decrypt the encrypted content string manually

1. Import the `decrypt` function provided in `/decrypt.js`:

```javascript
import decrypt from 'https://cdn.jsdelivr.net/gh/ardislu/static-encrypt/decrypt.js';
```

2. Pass the encrypted content string and the password to the `decrypt` function:

```javascript
const plaintext = await decrypt('ZE33hvS/TCP2pcI0SMp57SHYnxk+mB6u86y0IX9dJJAU7X7d77Wkg4h0iVlcgudL3HKtE8CDx++v90/Ic24Aq0YQgU1zzjuTHg==', 'hunter2');
```

3. The `decrypt` function will throw an error if the incorrect password is passed, or return the plaintext:

```javascript
plaintext
// 'Hello, world!'
```

You can also import the function dynamically (useful for lazy-loading or testing in DevTools):

```javascript
const { default: decrypt } = await import('https://cdn.jsdelivr.net/gh/ardislu/static-encrypt/decrypt.js');
```
