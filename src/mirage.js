import { createServer, Model } from "miragejs"

const users = [
  { uid: 1, username: "1234", password: "1234" },
  { uid: 2, username: "4321", password: "4321" },
  { uid: 3, username: "Tom", password: "12345678" },
  { uid: 3, username: "Bob", password: "12345678" }
];

const userInfo = [
  { uid: 1, name: "1337", status: "摸鱼中~", signature: "放浪不羁爱自由" }
]

const borrowlist = [
  {
    uid: 1,
    borrowlist: [
      {
        "bookName": "哈利波特",
        "borrowDate": "2021-06-01",
        "returnDate": "2021-06-02"
      },
      {
        "bookName": "计算机体系结构",
        "borrowDate": "2023-12-27",
        "returnDate": "2024-1-27"
      },
      {
        "bookName": "算法导论",
        "borrowDate": "2023-12-25",
        "returnDate": "2024-1-25"
      },
      {
        "bookName": "计算机网络",
        "borrowDate": "2023-3-27",
        "returnDate": "2023-4-27"
      },
      {
        "bookName": "计算机图形学",
        "borrowDate": "2023-5-2",
        "returnDate": "2023-6-2"
      },
      {
        "bookName": "哈利波特",
        "borrowDate": "2021-06-01",
        "returnDate": "2021-06-02"
      },
      {
        "bookName": "计算机体系结构",
        "borrowDate": "2023-12-27",
        "returnDate": "2024-1-27"
      },
      {
        "bookName": "算法导论",
        "borrowDate": "2023-12-25",
        "returnDate": "2024-1-25"
      },
      {
        "bookName": "计算机网络",
        "borrowDate": "2023-3-27",
        "returnDate": "2023-4-27"
      },
      {
        "bookName": "计算机图形学",
        "borrowDate": "2023-5-2",
        "returnDate": "2023-6-2"
      },
      {
        "bookName": "哈利波特",
        "borrowDate": "2021-06-01",
        "returnDate": "2021-06-02"
      },
      {
        "bookName": "计算机体系结构",
        "borrowDate": "2023-12-27",
        "returnDate": "2024-1-27"
      },
      {
        "bookName": "算法导论",
        "borrowDate": "2023-12-25",
        "returnDate": "2024-1-25"
      },
      {
        "bookName": "计算机网络",
        "borrowDate": "2023-3-27",
        "returnDate": "2023-4-27"
      },
      {
        "bookName": "计算机图形学",
        "borrowDate": "2023-5-2",
        "returnDate": "2023-6-2"
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

        if (user) {
          return {
            msg: 'Success',
            data: {
              userinfo: {
                uid: user.uid,
                name: user.username,
              },
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsicm9sZSI6InJlYWRlciIsImlkIjoiMTEiLCJ1c2VybmFtZSI6Imxpc2kifSwiZXhwIjoxNzA1MDY2NjM5fQ.KeniQEUJLEBqhFSU15IrPNC7v_IlZ1zkfdSYRCVrw9c"
            }
          };
        }
        else {
          return { msg: 'Fail' };
        }
      })


      // 用户借书列表
      this.post("/borrowlist", (schema, request) => {
        const { uid } = JSON.parse(request.requestBody)
        const res = borrowlist.find((item) => item.uid === uid);
        return {
          result: res
        }
      })

      // 用户个人信息
      this.post("/userInfo", (schema, request) => {
        const headers = request.requestHeaders;
        console.log("headers:")
        console.log(headers)
        const res = userInfo.find((item) => item.uid === uid)

        return {
          userInfo: res
        }
      })

      this.post("/register", (schema, request) => {
        const { username, password, telephoneNumber, email} = JSON.parse(request.requestBody)
        
        return {
          msg: "Success",
          code: 200,
          data: {

          }
        }
      })

    },
  })

  return server
}