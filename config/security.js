// const jwt = require('express-jwt');
// const url = require("url");
//
// const unSecureRoots = [];
// unSecureRoots.push('GET::/api/health-check');
//
// unSecureRoots.push('POST::/api/auth/login');
//
// //===== generator hook =====//
//
// module.exports = function (app) {
//
//     app.use(jwt({ secret: process.env.JWT_SECRET }).unless(function(req){
//         let lookUp = req.method+"::"+url.parse(req.originalUrl).pathname;
//         return unSecureRoots.indexOf(lookUp)>-1;
//     }));
//
//     return app;
// }