import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, {
    cors: { origin: '*' },
})
export class EventosGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;

    afterInit(server: any) {
        console.log('Esto se ejecuta cuando inicia')
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('Alguien se conecto al socket');
    }

    handleDisconnect(client: any) {
        console.log('Alguien se fue!')
    }

    @SubscribeMessage('recibirTexto')
    devolverTexto(
        @MessageBody()
            message: {cont:number, mensaje: string },
        @ConnectedSocket()
            socket: Socket
    ) {
        const textoJuego = {
            cont: message.cont,
            mensaje: message.mensaje
        };
        console.log('message', message);
        socket.broadcast
            .emit('escucharEventoRecibirTexto', textoJuego);
        return {mensaje: 'ok'};
    }

    @SubscribeMessage('recibirBandera')
    devolverBandera(
        @MessageBody()
            message: {bandera:number, opcion:number},
        @ConnectedSocket()
            socket: Socket
    ) {
        const contadorBandera = {
            bandera: message.bandera,
            opcion: message.opcion
        }
        console.log('message', message);
        socket.broadcast
            .emit('escucharEventoRecibirBandera', contadorBandera);
        return {mensaje: 'ok'};
    }
}
