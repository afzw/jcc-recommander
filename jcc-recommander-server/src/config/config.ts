type Config = {
  host: string
  port: number
  logDir: string
  publicDir: string
  uploadDir: string
  scriptDir: string
  mongoUri: string
}

const config: Config = {
  host: '',
  port: 0,
  logDir: '',
  publicDir: '',
  uploadDir: '',
  scriptDir: '',
  mongoUri: '',
}

export { config, Config }
