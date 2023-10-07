const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    try {
        if (req.method === 'GET') {
            const parsedUrl = url.parse(req.url, true);
            const pathname = parsedUrl.pathname;
            if (pathname === '/') {
                res.setHeader('Content-Type', 'html');
                res.writeHead(200);
                res.end('<h1>halo dunia!<h1>\n');
            } else if (pathname === '/animals') {
                const animals = [{
                    nama: "Monyet",
                    populasi: 300
                }, {
                    nama: "Kuda Nil",
                    populasi: 5
                }, {
                    nama: "Singa",
                    populasi: 2
                }];
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(animals));
            } else if (pathname === '/users') {
                const users = [{
                    nama: "Erwin",
                    umur: 18
                }, {
                    nama: "Fauzi",
                    umur: 21
                }, {
                    nama: "Eko",
                    umur: 37
                }];
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(users));
            } else {
                const salah = {
                    status: "Not Found !!",
                    message: "Resource Not Found"
                };
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(404);
                res.end(JSON.stringify(salah));
            }
        } else {
            throw new Error('Metode HTTP Tidak Diizinkan');
        }
    } catch (error) {
        let kode_error;
            if (error.message === 'Metode HTTP Tidak Diizinkan') {
                kode_error = 405;
            } else {
                kode_error = 404;
            }
        const pesan_error = {
            Status: "Tidak Diizinkan !!",
            message: error.message
        };
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(kode_error);
        res.end(JSON.stringify(pesan_error));
    }
});


const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
