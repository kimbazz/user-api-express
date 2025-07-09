export default class User {
  constructor({ id, name, email, passwordHash, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    if (!email.includes("@")) {
      throw new Error("Invalid email address");
    }
  }
}
