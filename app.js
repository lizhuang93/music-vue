const path = require("path");
const fs = require("fs")
const Koa = require("koa");
const serve = require("koa-static");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

router.get("/allMusic", (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: 'ok',
    data: fs.readdirSync("./music")
  }
});
// 注册中间件

app.use(serve(path.join(__dirname, "./music")));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log(`app starting at port ${3000}`);
});
