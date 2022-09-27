//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const axios = require("axios");
const { conn } = require('./src/db.js');
const { Tipo } = require('./src/db');

// Syncing all the models at once.
conn.sync ({ force: false }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const url = 'https://pokeapi.co/api/v2/type';
    let tiposAPI = await axios.get(url);
    tiposAPI.data.results.forEach(element => Tipo.findOrCreate({
      where: {
        nombre: element.name
      }
    }))



    //let tiposAPI = await axios.get(url);
    //Tipo.bulkCreate(tiposAPI.data.results.map(el => ({nombre: el.name})  ), {returning: true});
  });
});

