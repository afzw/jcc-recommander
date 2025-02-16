import { spawn } from 'child_process'
import { config } from '@/config/config'
import path from 'path'
import { Hero } from '@/models/hero'

async function runPythonScript(): Promise<string> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(config.scriptDir, 'hero-data-scrape.py')
    const pythonProcess = spawn('python3', [scriptPath])

    let output = ''
    let error = ''

    // 捕获标准输出
    pythonProcess.stdout.on('data', (data: string) => {
      output += data.toString()
    })

    // 捕获错误输出
    pythonProcess.stderr.on('data', (data: string) => {
      error += data.toString()
    })

    // 脚本执行完成时处理数据
    pythonProcess.on('close', (code: number) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}: ${error}`))
      } else {
        try {
          resolve(output)
        } catch (e) {
          reject(new Error(`Failed to parse Python output: ${e}`))
        }
      }
    })
  })
}

async function getHeroData(): Promise<Hero[]> {
  const array: Hero[] = []

  try {
    const data: string = await runPythonScript()
    const testArr = data.split('\n').slice(0, -1)
    for (let i = 0; i < testArr.length; i++) {
      const data = testArr[i].split(' ')
      const heroData = {
        name: data[0],
        bonds: data[1],
        avatar: data[2],
      }
      array.push(heroData)
    }
  } catch (error) {
    console.error('Error running Python script:', error)
  }

  return array
}

export { getHeroData }
