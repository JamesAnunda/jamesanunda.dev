/**
 * storage.ts — in-memory data storage for the portfolio server.
 *
 * The contact form does NOT store messages here; it sends them directly via email.
 * This module exists to support potential future features such as user authentication.
 * Replacing MemStorage with a database-backed class later requires no route changes.
 */

// Import Drizzle-generated types that keep the storage layer consistent with the schema
import { users, type User, type InsertUser } from "@shared/schema";

/**
 * IStorage — the contract that every storage implementation must satisfy.
 * Defining an interface (rather than using a concrete class everywhere) makes it
 * straightforward to swap the in-memory store for a real database in the future.
 */
export interface IStorage {
  // Retrieve a single user by their numeric primary key
  getUser(id: number): Promise<User | undefined>;

  // Retrieve a single user by their unique username string
  getUserByUsername(username: string): Promise<User | undefined>;

  // Persist a new user record and return it with its generated ID
  createUser(user: InsertUser): Promise<User>;
}

/**
 * MemStorage — an in-memory implementation of IStorage.
 *
 * Data is stored in a JavaScript Map for fast O(1) lookups by ID.
 * All data is lost when the server process restarts — this is intentional for development.
 * To add persistence, implement IStorage against a PostgreSQL client instead.
 */
export class MemStorage implements IStorage {
  // Internal map that stores users keyed by their numeric ID
  private users: Map<number, User>;

  // Auto-incrementing counter used to assign unique IDs to new users
  currentId: number;

  constructor() {
    // Start with an empty user store on server startup
    this.users = new Map();

    // IDs begin at 1 (matching typical database auto-increment behaviour)
    this.currentId = 1;
  }

  /**
   * getUser — look up a user by their numeric ID.
   * Returns the matching User object, or undefined if no user has that ID.
   */
  async getUser(id: number): Promise<User | undefined> {
    // Map.get() returns undefined automatically when the key is not found
    return this.users.get(id);
  }

  /**
   * getUserByUsername — look up a user by their username string.
   * Iterates all stored users and returns the first match, or undefined.
   */
  async getUserByUsername(username: string): Promise<User | undefined> {
    // Convert the Map's values to an array so Array.find() can be used
    return Array.from(this.users.values()).find(
      (user) => user.username === username, // Strict equality check on the username field
    );
  }

  /**
   * createUser — store a new user and return the saved record (with its assigned ID).
   * The caller provides all fields except `id`; this method assigns the ID.
   */
  async createUser(insertUser: InsertUser): Promise<User> {
    // Capture the current counter value as this user's ID, then increment for the next user
    const id = this.currentId++;

    // Spread all fields from insertUser and add the generated id
    const user: User = { ...insertUser, id };

    // Store the complete user object in the Map, keyed by its ID
    this.users.set(id, user);

    // Return the newly created user (including the assigned id) to the caller
    return user;
  }
}

// Export a single shared instance of MemStorage so all route handlers use the same store
export const storage = new MemStorage();
