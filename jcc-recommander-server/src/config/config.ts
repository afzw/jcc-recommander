type Config = {
  host: string
  port: number
  logDir: string
  publicDir: string
  uploadDir: string
  scriptDir: string
}

const config: Config = {
  host: '',
  port: 0,
  logDir: '',
  publicDir: '',
  uploadDir: '',
  scriptDir: '',
}

export { config, Config }
