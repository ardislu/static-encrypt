/**
 * Decrypt an encrypted string.
 * @param {string} content - The ciphertext to decrypt.
 * @param {string} password - The password used to encrypt the string.
 * @returns {Promise<string>} A promise that resolves to the plaintext.
 */
export default async function decrypt(content, password) {
  const encodedPassword = new TextEncoder().encode(password);

  const contentBuffer = Uint8Array.from(atob(content), c => c.charCodeAt(0));
  const salt = new Uint8Array(32);
  const iv = new Uint8Array(12);
  const ciphertext = new Uint8Array(contentBuffer.byteLength - salt.byteLength - iv.byteLength);
  salt.set(contentBuffer.slice(0, salt.byteLength));
  iv.set(contentBuffer.slice(salt.byteLength, salt.byteLength + iv.byteLength));
  ciphertext.set(contentBuffer.slice(salt.byteLength + iv.byteLength));

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
    ['decrypt']
  );

  const encodedPlaintext = new Uint8Array(await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  ));

  const plaintext = new TextDecoder().decode(encodedPlaintext);

  return plaintext;
}
