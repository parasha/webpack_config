function getData(){
  return new Promise(res=>{
    console.log('testing')
    res('peanut butter')
  })
}

module.exports = getData