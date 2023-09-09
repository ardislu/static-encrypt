/**
 * Decrypt an encrypted string.
 * @param {string} content - The ciphertext to decrypt.
 * @param {string} password - The password used to encrypt the string.
 * @returns {Promise<string>} A promise that resolves to the plaintext.
 */
export function decrypt(content: string, password: string): Promise<string>;
