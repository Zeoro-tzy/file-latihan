// const http = require("http")
// const fs = require("fs")
// // let url = require("url")
// const port = 3000

// http.createServer(function(req,res){
//     fs.readFile("file/file.html",(err,data)=>{
//         if(err) throw err
//         res.writeHead(200,{'Content-Type' : 'text/html'})
//         res.write(data)
//         res.end()
//         })       


// }).listen(port,()=>console.log(`Server ${port} berjalan`))




// let url = require("url")
// let adr = 'https://www.petanikode.com/search.php?year=2018&month=february';
// let q = url.parse(adr,true);

// //Hasil parse url
// console.log("protocol : " + q.protocol )
// console.log("host : " + q.host )
// console.log("pathname : " + q.pathname )
// console.log("search: " + q.search )

// let qdata = q.query
// console.log(qdata)



const fs = require("fs")
const http = require("http")

http.createServer((req,res) => {
        simpanUrl = req.url
        switch(simpanUrl){
            case '/index' :
                fs.readFile("index.html",(err,data) => {
                    if(err) throw err
                    res.writeHead(200,{"Content-Type" : "text/html"})
                    res.write(data)
                    res.end()
                })
                break
            case '/router1' :
                fs.readFile("file/file.html",(err,data) => {
                    if(err) throw err
                    res.writeHead(200,{"Content-Type" : "text/html"})
                    res.write(data)
                    res.end()
                })
                break
            case '/router2' :
                fs.readFile("file/file2.html",(err,data) => {
                    if(err) throw err
                    res.writeHead(200,{"Content-Type" : "text/html"})
                    res.write(data)
                    res.end()
                })
                break
            case '/router3' :
                fs.readFile("file/file3.html",(err,data) => {
                    if(err) throw err
                    res.writeHead(200,{"Content-Type" : "text/html"})
                    res.write(data)
                    res.end()
                })
                break
            case '/router4' :
                fs.readFile("file/file4.html",(err,data) => {
                    if(err) throw err
                    res.writeHead(200,{"Content-Type" : "text/html"})
                    res.write(data)
                    res.end()
                })
                break
            case '/router5' :
                fs.readFile("file/file5.html",(err,data) => {
                    if(err) throw err
                    res.writeHead(200,{"Content-Type" : "text/html"})
                    res.write(data)
                    res.end()
                })
                break
            default :
            fs.readFile("def.html",(err,data) => {
                if(err) throw err
                res.writeHead(200,{"Content-Type" : "text/html"})
                res.write(data)
                res.end()
            })
            break
        }
}).listen(3000,() => console.log("Server 3000 telah berjalan"))