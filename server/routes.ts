/**
 * API route definitions.
 *
 * Contact leads are delivered directly by FormSubmit from the browser, so the
 * server does not handle email credentials or a contact endpoint.
 */
import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(_app: Express): Promise<Server> {
  return createServer(_app);
}
