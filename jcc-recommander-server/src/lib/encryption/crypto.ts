import crypto from 'crypto'

/**
 * SH512加密
 */
export function encryptStringUsingSH512(str: string): string {
  return crypto.createHash('sha512').update(str).digest('hex')
}

/**
 * 生成随机的32位16进制字符串（常用作salt值）。
 */
export function genRandom32BitsHexString() {
  return crypto.randomBytes(16).toString('hex')
}

/**
 * 生成密钥（常用作用户密码）。
 * @description 根据用户的密码和salt值生成基于密码的密钥。
 *
 * `crypto.pbkdf2Sync` => Provides a synchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation. A selected HMAC digest algorithm specified by digest is applied to derive a key of the requested byte length (keylen) from the password, salt and iterations.
 *
 *  参考：https://nodejs.org/dist/latest-v18.x/docs/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
 */
export function genPBK(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
}

/**
 * 生成唯一标识
 */
export function genUniqString() {
  const timePart = new Date().getTime().toString()
  const randomPart = crypto.randomBytes(4).toString('hex')

  const result = `${randomPart}-${timePart}`
  return result
}
