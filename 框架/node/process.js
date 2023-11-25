const process = require('node:process')

process.on('exit', (code) => {
  console.log('1')
  setTimeout(()=>{
    console.log('hi')
  }
  ,0)
  console.log('2')

})