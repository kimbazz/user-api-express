import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

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

/**
 * Extracts the Bearer token from the Authorization header.
 * @param {string} authorization - authorization from req.header
 * @returns {string|null} The Bearer token or null if not found
 */
export function getBearerToken(authorization) {
  const authHeader = authorization;

  if (authHeader && typeof authHeader === "string") {
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      return parts[1];
    }
  }

  return null;
}
