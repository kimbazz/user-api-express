import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // 10-12 is common for production

/**
 * Hash a plaintext password.
 * @param {string} password
 * @returns {Promise<string>} The hashed password
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plaintext password to a bcrypt hash.
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}
