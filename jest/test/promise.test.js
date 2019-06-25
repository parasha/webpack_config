const getData = require('../src/promise')

function beforeFun() {
  return new Promise(res => {
    setTimeout(function () {
      console.log('test start');
      res();
    }, 200)
  })
}

test('the data is peanut butter', () => {
  expect(getData()).resolves.toBe('peanut butter');
})



describe('scope test', () => {
  beforeEach(() => {
    return beforeFun();
  })
  test('the data is peanut butter', () => {
    return getData().then(res => {
      expect(res).toBe('peanut butter')
    })
  })
});

