import { createServer, Model } from "miragejs"

const users = [
  { uid: 1, username: "1234", password: "1234" },
  { uid: 2, username: "4321",  password: "4321"}
];

const userInfo = [
  {uid: 1, name: "1337", status: "摸鱼中", signature: "放浪不羁爱自由"}
]

const borrowlist = [
  {
    uid: 1,
    borrowlist:[
      {
        bookname: "哈利波特",
      },
      {
        bookname: "else"
      }
    ]
  },
]

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.db.loadData({
        users,
        borrowlist,
        userInfo,
      });
    },

    routes() {
      this.urlPrefix = "http://localhost:5555"
      this.namespace = "api"

      // 获取所有用户信息
      this.get("/users", (schema) => {
        return schema.db.users
      })

      // 登录请求
      this.post("/login", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        const user = users.find((u) => u.username === username && u.password === password);

        if(user){
          return {
            status: 'ok',
            userInfo: {
              uid: user.uid,
              name: user.username,
            },
          };
        }
        else{
          return { status: 'wrong' };
        }
      })


      // 用户借书列表
      this.post("/borrowlist", (schema, request) => {
        const {uid} = JSON.parse(request.requestBody)
        const res =  borrowlist.find((item) => item.uid === uid);
        return {
          result: res
        }
      })

      // 用户个人信息
      this.post("/userinfo", (schema, request) => {
        const {uid} = JSON.parse(request.requestBody)
        console.log(uid)
        const res = userInfo.find((item) => item.uid === uid)

        return {
          userInfo: res
        }
      })

    },
  })

  return server
}