export default async function refreshToken () {
  // Refresh токены сервер не выдает, поэтому кидаю всегда ошибку
  throw new Error('NO_REFRESH_TOKEN_RECEIVED');
}