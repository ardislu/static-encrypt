# static-encrypt

A tool to encrypt any static content, and (optionally) create a basic password-protected frontend that can be hosted statically.

Like [staticrypt](https://github.com/robinmoisson/staticrypt) but uses the modern [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) instead of `crypto-js`.

## How to decrypt the encrypted content string manually

1. Import the `decrypt` function provided in `/decrypt.js`:

```javascript
import decrypt from 'https://cdn.jsdelivr.net/gh/ardislu/static-encrypt/decrypt.js';
```

2. Pass the encrypted content string and the password to the `decrypt` function:

```javascript
const plaintext = await decrypt('jklWIe958BY3LLgf/RDePN4ThOTUCPwBkEf9uueZRO2g2nVWuk20webn+/HR14b2iJJnYCkzDT05f7qhsnx4Of98uu+T5/oinZsQI3o3mhvPmfIwVAdl2tq1V8cG', 'hunter2');
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
