const path = require("path");
const Koa = require("koa");
const serve = require("koa-static");

const app = new Koa();

// 注册中间件

app.use(serve(path.join(__dirname, "./music")));

app.listen(3000, () => {
  console.log(`app starting at port ${3000}`);
});
