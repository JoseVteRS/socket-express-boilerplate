// Servidor express
const express = require('express');
const http = require('http')
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080
    // Http server
    this.server = http.createServer(this.app);
    // Coonfiguracion sockets
    this.io = socketio(this.server, {/** configuraciones */ });
  }

  middelewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }

  configurateSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar middlewares
    this.middelewares();
    this.configurateSockets();
    // Inicializar server
    this.server.listen(this.port, () => {
      console.log(`✅ Server runing on http://localhost:${this.port} 💪`)
    })
  }
}

module.exports = Server;