import { createServer, Model } from "miragejs"

const users = [
  { uid: 1, username: "1234", password: "1234" },
  { uid: 2, username: "4321",  password: "4321"}
];


export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.db.loadData({
        users,
      });
    },

    routes() {
      this.urlPrefix = "http://localhost:5555"
      this.namespace = "api"

      this.get("/users", (schema) => {
        return schema.db.users
      })

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
    },
  })

  return server
}