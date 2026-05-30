import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account = new Account(this.client);

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return await this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Create account error:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}

async function getCurrentUser() {
  try {
    const user = await authService.account.get();
    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

const authService = new AuthService();

export default AuthService;
