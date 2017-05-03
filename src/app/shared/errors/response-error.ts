export class ResponseError extends Error {
  constructor(message: string) {
    const err: any = super(message);
    (<any> this).name = err.name = 'ResponseError';
    (<any> this).message = err.message;
  }
}
