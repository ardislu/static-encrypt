/**
 * Encrypt a string.
 * @param {string} plaintext - The string to encrypt.
 * @param {string} password - The password used to encrypt the string.
 * @returns {Promise<string>} A promise that resolves to the ciphertext.
 */
export default async function encrypt(plaintext, password) {
  const encoder = new TextEncoder();
  const encodedPlaintext = encoder.encode(plaintext);
  const encodedPassword = encoder.encode(password);

  const salt = new Uint8Array(32);
  const iv = new Uint8Array(12);
  crypto.getRandomValues(salt);
  crypto.getRandomValues(iv);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encodedPassword,
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: 'SHA-512',
      salt,
      iterations: 400_000
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encodedPlaintext
  ));

  const contentBuffer = new Uint8Array(salt.byteLength + iv.byteLength + ciphertext.byteLength);
  contentBuffer.set(salt);
  contentBuffer.set(iv, salt.byteLength);
  contentBuffer.set(ciphertext, salt.byteLength + iv.byteLength);
  const content = btoa(String.fromCharCode(...contentBuffer));

  return content;
}