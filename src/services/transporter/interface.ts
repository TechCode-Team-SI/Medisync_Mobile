export abstract class Transporter {
  abstract get: (url: string, token: string) => Promise<unknown>;
  abstract post: (url: string, body: object) => Promise<unknown>;
  abstract patch: (url: string, body: object) => Promise<unknown>;
  abstract delete: (url: string, token: string) => Promise<unknown>;
}
