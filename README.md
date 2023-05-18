# static-encrypt

A tool to encrypt any static content, and (optionally) create a basic password-protected frontend that can be hosted statically.

Like [StatiCrypt](https://github.com/robinmoisson/staticrypt) but reduced to just the bare minimum code required to get the job done.

See [static-encrypt-cli](https://github.com/ardislu/static-encrypt-cli) for a Rust CLI companion to this tool.

## Usage

This tool is inspired by and works similarly to [StatiCrypt](https://robinmoisson.github.io/staticrypt/).

1. Go to [https://static-encrypt.ardis.lu/](https://static-encrypt.ardis.lu/).

2. Enter the HTML or any plaintext you want to encrypt into the **Content** box.

3. Enter the password you want to use to encrypt the content into the **Password** box. Use a long password.

4. Press the `Encrypt` button.

5. Either:
    - Press `Download HTML file` to download a ready-to-use web page containing your encrypted content, or
    - Copy the string inside the  `Encrypted content` box and integrate it into your own frontend or use case (see next sections)

## `encrypt.js` and `decrypt.js`

Both the `encrypt` and `decrypt` functions are written in vanilla JavaScript with no dependencies and are provided as standalone files for easy integration. Some example uses are described below:

### Encrypt or decrypt in bulk

On the [static-encrypt webpage](https://static-encrypt.ardis.lu/), both the `encrypt` and `decrypt` functions are directly accessible in the web browser [DevTools](https://developer.mozilla.org/en-US/docs/Glossary/Developer_Tools) console for bulk usage.

Example: encrypt several strings quickly
```javascript
const contentList = ['Static content 1', 'Static content 2', 'Static content 3', 'Static content 4', 'Static content 5'];
const encryptedContentList = await Promise.all(contentList.map(v => globalThis.encrypt(v, 'correcthorsebatterystaple')));
/*
[
    "LNQ5Afufy7LdgDzA6YT7cvVKh95OP7qGPe25VtcW+u8sFvJFblg6WDoFFWlXWiQ28YCMzr7VKOA9wJnX2uBKvekXG0nU/j+tcAArKA==",
    "iWaofdEYn1etH2ITbVJXn42qpacHO8vvRq0UPr0xEjD7j26zh7ZMT/0O3aXFcru9wcDcHJ1cmvBetLaNWVNzOOsmb0FYiq+Ucmax+A==",
    "pf0KN7JApJxc4gi9erUB84Szp1hdRya5shJiya2G9DscY4ekX9hAQKtBw7jRCIaMX/e3FH7jJG9PJpVzb2h4pF4PMXliBCQV4ypUMA==",
    "IGHUEb4RhwdLnO2KH++gxrlwPBaPPC+13k/m9zg380Y82LAaD0iMASevkdFVnYbAza6Yxji/IwJTacJoOeijvPoP8DCbj4qhd/g+YA==",
    "wEBT/qm0g5hbGYcUyAMOQZwnjHADwuAjKBvDRmw/PcAAEoma0FKuZbZrHjq8z/2IUlzbhMdnLGC91ODfqu+4j3HH7/idKha1BzVK/w=="
]
*/
```

Example: decrypt several strings quickly
```javascript
await Promise.all(encryptedContentList.map(v => globalThis.decrypt(v, 'correcthorsebatterystaple')));
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

### Integrate `decrypt` into your own frontend

1. Import the `decrypt` function provided in `/decrypt.js`:

```javascript
import { decrypt } from 'https://cdn.statically.io/gh/ardislu/static-encrypt/master/decrypt.js';
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
const { decrypt } = await import('https://cdn.statically.io/gh/ardislu/static-encrypt/master/decrypt.js');
```
