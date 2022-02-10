const https = require("https");

const options = {
    hostname: 'www.random.org',
    port: 443,
    path: '/integers/?num=10&min=1&max=6&col=1&base=10&format=plain&rnd=new',
    method: 'GET'
};

const myAsyncRequest = function(options) {
    return new Promise((resolve, reject) => {

        const callback = function(response) {
            if (response.statusCode !== 200) {
                return reject(response.statusMessage);
            }

            let str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                let a = (str); //преобразовать строку в JSON

                return resolve(a);
            });
        };

        const req = https.request(options, callback);

        req.on('error', (e) => {
            return reject(err);
        });

        req.end();
        
    });
}

myAsyncRequest(options).then(result => console.log(result));