const myPromise = new Promise((resolve, reject) => {
    let number = Math.ceil(Math.random()*2);
    console.log(number % 2===0)
    if (number % 2===0){
        resolve("成功了")
    }else{
        reject("炸了")
    }
})

myPromise.then((message)=>{
    console.log(message)
    return "123"
}).then((msg)=>{
    console.log('第二次'+msg)
    throw new Error("第二个then在搞事")
}).catch(
    (error)=>{
      console.log("触发了错误回调",error)
    }
)
