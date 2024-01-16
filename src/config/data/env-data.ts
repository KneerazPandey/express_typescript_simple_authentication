export default class EnvData {
  static get PORT(): number {
    return parseInt(process.env.PORT ?? "3000");
  }

  static get SECRET_KEY(): string {
    return process.env.SECRET_KEY ?? 'secret';
  }

  static get DEBUG() : boolean {
    if (process.env.DEBUG === 'true') {
        return true;
    }
    return false;
  }

  static get DB_URL() : string {
    return process.env.DB_URL ?? 'url';
  }

  static get COOKIE_KEY(): string {
    return process.env.COOKIE_KEY ?? 'cookie-key';
  }
}
