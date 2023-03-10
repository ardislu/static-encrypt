# static-encrypt

A tool to encrypt any static content, and (optionally) create a basic password-protected frontend that can be hosted statically.

Like [staticrypt](https://github.com/robinmoisson/staticrypt) but uses the modern [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) instead of `crypto-js`.

See [static-encrypt-cli](https://github.com/ardislu/static-encrypt-cli) for a Rust CLI companion to this tool.

## How to encrypt or decrypt in bulk

The `encrypt` and `decrypt` functions are accessible in the web browser [DevTools](https://developer.mozilla.org/en-US/docs/Glossary/Developer_Tools) console. For bulk usage, you can open the DevTools console while on the [static-encrypt page](https://static-encrypt.ardis.lu/) and directly call the functions. Examples:

```javascript
// Encrypting several items
const contentList = ['Static content 1', 'Static content 2', 'Static content 3', 'Static content 4', 'Static content 5'];
const encryptedContentList = await Promise.all(contentList.map(v => globalThis.encrypt(v, 'example-password')));
/*
[
    "c5VMxXMgLcQGuFXy+iZm1gMqHkwhgCIKd6lDIeOZgskoJ4u6uUzymE6poGAVk532GDhRxCsEEcnNX9kQW1L0NcDB1nBHpY2AGmCUzw==",
    "Y+i7lX0J9oGJFrPU4QtKhw4V5rMLnj/cppFld55lOXmSoH65kTrJWmNIiRhV37EoDRRuW1SATugZmji1L1sfo3eSminEHCCsODtRiQ==",
    "WLsUHQ+zR85kxTw6eK9KHJcWGh1KxFzjb6O36WuxG7W4I6LRJwGui5XD3EOg91/Bs+Q+pFzVoE+BN0vKZhSd5ezR1uC3KGQhf0gQTg==",
    "i+R51OiKz6VPdwg1s/OGl4oxAjW5nXfUMyRzZ9Xk75VzAlfeIZmC8xS8rK7fFwwVy5oHxLVfgYV4HT5IbkZ15R1M5b6xMbBYLy24pw==",
    "Om4MI5FEkkO5pStSOXOn+KYvvXTeAhj2sl7aQ/by0pw2EKpMzhQz2Mt94F+51iG7KwnPHjoGc+qYlDu85kfMJbd1cKI8K7MF+YqjvA=="
]
*/

// Decrypting several items
await Promise.all(encryptedContentList.map(v => globalThis.decrypt(v, 'example-password')));
/*
[
    "Static content 1",
    "Static content 2",
    "Static content 3",
    "Static content 4",
    "Static content 5"
]
*/
```

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
