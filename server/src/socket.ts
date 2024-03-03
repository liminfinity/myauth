import { Server as SocketServer } from "socket.io";
import type { Server as IHttpServer } from "http";
export function createSocketServer(httpServer: IHttpServer) {
    const io = new SocketServer(httpServer, {
        cors: {
            origin: '*'
        },
        path: '/activating-io'
    })
    return io;
}