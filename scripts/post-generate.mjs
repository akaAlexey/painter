import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const output = join(process.cwd(), '.output', 'public')
if (existsSync(output)) {
  writeFileSync(join(output, '.nojekyll'), '')
  const index = join(output, 'index.html')
  const notFound = join(output, '404.html')
  if (existsSync(index) && !existsSync(notFound)) copyFileSync(index, notFound)
  mkdirSync(join(output, 'docs'), { recursive: true })
}
