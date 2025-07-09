export default class User {
  constructor({ id, name, email, passwordHash, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }
  }
}
