const express = require('express');
// const http = require('http');
///////////////////
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');



// import { swaggerDocument } from "./swagger/swagger.ts";
//>
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Messages = require('./models/Messages');
const Users = require('./models/Users');
const configs = require('./configs');
const router = require('./routers');

////////////////////
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
//>
const {authenticate2} = require('./services/auth');


const WebSocket = require("ws");
const { access } = require('fs');



// const { setupWebSocket }= require('./setupWebSocket');
//<
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth:  {
          type: "apiKey",
          in: "header",
          name: "access_token"
        },
      },
    },
    security: {
      "- cookieAuth": "[access_token]",
    }
  },
  apis: ["./routers/*.js"],
};

const specs = swaggerJsdoc(options);
//>

const app = express();
//<New
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
//>
const server = require('http').createServer(app);


// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server: server});
const wss = new WebSocket.Server({ noServer: true });

app.use(cors());
app.use(cookieParser());


const jsonParser = bodyParser.json()
app.use(jsonParser, router);

server.on('upgrade', function upgrade(request, socket, head) {

        wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit('connection', ws, request);
        });
})



wss.on("connection", (ctx) => {
    // print number of active connections
    console.log("connected", wss.clients.size);

    // handle message events
    // receive a message and echo it back
    ctx.on("message", (message) => {
        authenticate2(JSON.parse(message).token)
        wss.clients.forEach(function each(client) {
            if (client !== ctx && client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
      console.log(`Received message => ${message}`);
    });
    
    // handle close event
    ctx.on("close", () => {
      console.log("closed", wss.clients.size);
    });
});
})


server.listen(configs.port);

// app.listen(configs.port);
console.log(`Server listening on port ${configs.port}`);



(async () => {
    try {
        await Users.sync();
        await Messages.sync();
    } catch(e) {
        console.log(e);
    }
})();