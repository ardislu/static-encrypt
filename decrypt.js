export default async function decrypt(content, password) {
  const encodedPassword = new TextEncoder().encode(password);

  const contentBuffer = Uint8Array.from(atob(content), c => c.charCodeAt(0));
  const salt = new Uint8Array(32);
  const iv = new Uint8Array(32);
  const ciphertext = new Uint8Array(contentBuffer.byteLength - 64);
  salt.set(contentBuffer.slice(0, 32));
  iv.set(contentBuffer.slice(32, 64));
  ciphertext.set(contentBuffer.slice(64));

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
