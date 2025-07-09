import { jest } from "@jest/globals";
import UserCase from "../User.js";

describe("UserCase.create", () => {
  let userRepoMock;
  let userCase;

  beforeEach(() => {
    userRepoMock = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    userCase = new UserCase({ userRepo: userRepoMock });
    jest.clearAllMocks();
  });

  it("should return error if email already exists", async () => {
    userRepoMock.findByEmail.mockResolvedValue({
      id: "123",
      email: "test@mail.com",
    });

    const result = await userCase.create({
      name: "Test",
      email: "test@mail.com",
      password: "pass",
    });

    expect(result.isError).toBe(true);
    expect(result.message).toBe("Email already in use");
    expect(result.user).toBeNull();
    expect(userRepoMock.create).not.toHaveBeenCalled();
  });

  it("should return error if user creation fails", async () => {
    userRepoMock.findByEmail.mockResolvedValue(null);
    jest.mock("../../utils/security.js", () => ({
      hashPassword: jest.fn().mockResolvedValue("hashedpassword"),
    }));
    userRepoMock.create.mockResolvedValue(null);

    const result = await userCase.create({
      name: "Test",
      email: "test@mail.com",
      password: "pass",
    });

    expect(result.isError).toBe(true);
    expect(result.message).toMatch(/Something went wrong/);
    expect(result.user).toBeNull();
  });

  it("should create user and return success", async () => {
    userRepoMock.findByEmail.mockResolvedValue(null);
    jest.mock("../../utils/security.js", () => ({
      hashPassword: jest.fn().mockResolvedValue("hashedpassword"),
    }));
    const fakeUser = {
      id: "1",
      name: "Test",
      email: "test@mail.com",
      passwordHash: "hashedpass",
      createdAt: new Date(),
    };
    userRepoMock.create.mockResolvedValue(fakeUser);

    const result = await userCase.create({
      name: "Test",
      email: "test@mail.com",
      password: "pass",
    });

    expect(result.isError).toBe(false);
    expect(result.message).toBe("OK");
    expect(result.user).toEqual(fakeUser);
    expect(userRepoMock.create).toHaveBeenCalled();
  });

  it("should throw error if something unexpected happens", async () => {
    userRepoMock.findByEmail.mockRejectedValue(new Error("DB error"));

    await expect(
      userCase.create({
        name: "Test",
        email: "test@mail.com",
        password: "pass",
      })
    ).rejects.toThrow("DB error");
  });
});
