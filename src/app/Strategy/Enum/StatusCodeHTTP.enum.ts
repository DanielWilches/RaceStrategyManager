export enum StatusCodeHTTPEnum {
  /** The request has been received and the process is continuing. */
  Continue = 100,

  /** The request has succeeded. */
  OK = 200,

  /** The server could not understand the request due to invalid syntax. */
  BadRequest = 400,

  /** The server can not find the requested resource. */
  NotFound = 404,

  /** The server was acting as a gateway or proxy and did not receive a timely response from the upstream server. */
  GatewayTimeout = 504
}
