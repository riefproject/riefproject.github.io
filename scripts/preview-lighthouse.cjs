const { spawn } = require('child_process')
const http = require('http')

const url = 'http://127.0.0.1:4321/'
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4321'], {
  stdio: ['ignore', 'inherit', 'inherit'],
})

const stop = () => {
  server.kill('SIGTERM')
  process.exit(0)
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)

const waitForServer = () => {
  http
    .get(url, (response) => {
      response.resume()
      console.log('Lighthouse preview ready')
    })
    .on('error', () => setTimeout(waitForServer, 200))
}

waitForServer()
