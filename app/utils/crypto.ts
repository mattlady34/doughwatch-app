// TODO: Day 1 - Crypto utilities for encrypting/decrypting sensitive data
// These functions will encrypt/decrypt access tokens and other sensitive data

/**
 * Encrypts a string value using the app's encryption key
 * TODO: Implement actual encryption logic
 * - Use ENCRYPTION_KEY environment variable
 * - Consider using AES-256-GCM for encryption
 * - Add proper error handling
 * - Ensure encrypted values are base64 encoded for storage
 * 
 * @param value - The plain text value to encrypt
 * @returns The encrypted value as a base64 string
 */
export const encrypt = (value: string): string => {
  // TODO: Implement encryption
  // const key = process.env.ENCRYPTION_KEY;
  // if (!key) {
  //   throw new Error('ENCRYPTION_KEY environment variable not set');
  // }
  
  // TODO: Use crypto library to encrypt
  // const cipher = crypto.createCipher('aes-256-gcm', key);
  // let encrypted = cipher.update(value, 'utf8', 'base64');
  // encrypted += cipher.final('base64');
  // return encrypted;
  
  console.warn('encrypt() not implemented yet - returning plain text');
  return value; // TEMPORARY - remove when implementing
};

/**
 * Decrypts a string value using the app's encryption key
 * TODO: Implement actual decryption logic
 * - Use ENCRYPTION_KEY environment variable
 * - Handle decryption errors gracefully
 * - Validate input format
 * 
 * @param encryptedValue - The encrypted value as a base64 string
 * @returns The decrypted plain text value
 */
export const decrypt = (encryptedValue: string): string => {
  // TODO: Implement decryption
  // const key = process.env.ENCRYPTION_KEY;
  // if (!key) {
  //   throw new Error('ENCRYPTION_KEY environment variable not set');
  // }
  
  // TODO: Use crypto library to decrypt
  // const decipher = crypto.createDecipher('aes-256-gcm', key);
  // let decrypted = decipher.update(encryptedValue, 'base64', 'utf8');
  // decrypted += decipher.final('utf8');
  // return decrypted;
  
  console.warn('decrypt() not implemented yet - returning encrypted text as-is');
  return encryptedValue; // TEMPORARY - remove when implementing
};

/**
 * TODO: Add utility functions for:
 * - Key rotation
 * - Encryption key validation
 * - Secure key generation
 * - Hash functions for non-reversible data
 */
