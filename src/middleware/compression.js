// import compression from 'compression'

// const compressionMiddleware = () => {
//     return compression({
//         filter: (req, res) => {
//             if (req.headers['x-no-compression']) {
//                 return false
//             }
//             return compression.filter(req, res)
//         },
//     })
// }

// export default compressionMiddleware


// //Ye data ko compreess krnay k liay use hota ha filter ak function hota jis hum data ko compress krtay ha mean JSON, HTML etc maslan 100KB ka ha tou ye usko 20kb kr dae fa
// //agr client khta ha k mujay compression ni chaaiy tou hum usko false rakh detay ha