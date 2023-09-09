/**
 * Encrypt a string.
 * @param {string} plaintext - The string to encrypt.
 * @param {string} password - The password used to encrypt the string.
 * @returns {Promise<string>} A promise that resolves to the ciphertext.
 */
export function encrypt(plaintext: string, password: string): Promise<string>;
