import jwt from 'jsonwebtoken'

/**
 * 生成一个jsonwebtoken。
 * @description 使用`jsonwebtoken`库的`sign`方法，同步签名载荷和秘钥(私/公)信息，并生成一个jsonwebtoken。
 * @param data 载荷数据
 * @param secret 秘钥(公/私)
 * @return jsonwebtoken
 */
export function signJWT<D extends string | object | Buffer>(data: D, secret: string): string {
  const payload = { data } // payload需要一个POJO，为了兼容各种情况，暂使用将数据直接放进一个对象的做法。
  const token = jwt.sign(payload, secret, { expiresIn: 60 })
  return token
}

/**
 * 解析jsonwebtoken，得到载荷数据。
 * @param token jsonwebtoken
 * @param secret 秘钥
 * @returns 载荷数据
 */
export function verifyJWT<V>(token: string, secret: jwt.Secret): V {
  const payload = jwt.verify(token, secret) as { data: V }
  const data = payload.data
  return data
}
