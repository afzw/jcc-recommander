/**
 * 单行语句获取Promise结果值和错误原因
 * @param promise Promise实例
 * @returns [错误, Promise结果值]
 */
export function callAsync<U = any, T = unknown>(promise: Promise<T>): Promise<[U | null, T | null]> {
  return promise.then<[null, T]>((data: T) => [null, data]).catch<[U, null]>((err: U) => [err, null])
}

export default callAsync
