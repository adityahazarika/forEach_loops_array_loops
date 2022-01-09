function fun1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello")
    }, 3000);
  })
}

async function fun2() {
  console.log("hello")
  return "hello123"
}

async function loop() {

  // Process in Serial (one by one)
  for (const i of [1, 2, 3]) {
    let res = await fun1()
    console.log(i, res)
  }

  // forEach is not designed for asynchronous code, await will not wait and will directly execute the fun2 function
  await [1, 2, 3].forEach(async (data) => {
    let res = await fun1()
    console.log(data, res)
  })

  // Process in parallel
  await Promise.all([1, 2, 3].map(async (data) => {
    let res = await fun1();
    console.log(data, res)
    return res
  }));

  //   Process in Serial (one by one)
  await [1, 2, 3].reduce(async (a, data) => {
    // Wait for the previous item to finish processing
    let res1 = await a;
    // Process this item
    let res = await fun1()
    console.log(data, res, res1)
  }, Promise.resolve(3))

  await fun2()
}

loop().then()
