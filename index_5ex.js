// для запроса с ноды:
const https = require("https");

const options = {
    hostname: 'www.random.org',
    port: 443,
    path: '/integers/?num=10&min=1&max=6&col=1&base=10&format=plain&rnd=new',
    method: 'GET'
};


const promiseA = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
        let buf = "";
        res.on('data', (dataPart) => {
            buf += dataPart;
        });
    
        res.on("end", () => {
            resolve(buf);
        })
    });
      
    req.on('error', (e) => {
        reject(e);
    });
    req.end();
});

// promiseA
//     .then((result) => {
//         console.log("result: ", result);
//     })
//     .catch((error) => {
//         console.log("error: ", error);
//     })

async function main () {
    let result = await promiseA;
    console.log("result: ", result);
}

main();