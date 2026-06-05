import config from "../config/config.js";
import { Client, Databases, Storage, Account, ID, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      console.log("Appwrite create post featured image:", featuredImage, "and userId:", userId);

      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.error("Create post error:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.error("Update post error:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.error("Delete post error:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.error("Get post error:", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.error("Get posts error:", error);
      return false;
    }
  }

  //File storage methods
  async uploadFile(file) {
    try {
      const fileId = ID.unique();
      console.log("Uploading file with ID", fileId, "and file:", file);
      await this.bucket.createFile(config.appwriteBucketId, fileId, file);
      console.log("File uploaded successfully with ID:", fileId);
      return fileId;
    } catch (error) {
      console.error("Upload file error:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Delete file error:", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      console.log("Getting file preview for file ID:", fileId);
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Get file preview error:", error);
      return null;
    }
  }

  getFileView(fileId) {
    try {
      console.log("Getting file view for file ID:", fileId);
      return this.bucket.getFileView(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite service :: getFileView :: error", error);
      return null;
    }
  }
}

const service = new Service();

export default service;
