export enum EServerErrors {
  //Common errors
  COMMON_SERVER_ERROR = 500,
  //User service
  INCORRECT_PASSWORD = 501,
  INCORRECT_EMAIL = 502,
  USER_ALREADY_EXISTS = 503,

  //Portfolio service
  ASSET_ALREADY_EXISTS = 504,
}
