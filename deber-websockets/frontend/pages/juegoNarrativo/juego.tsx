import {useEffect, useState} from "react";
import io from "socket.io-client";

const servidor = "http://localhost:3002";
const socket = io(servidor);

const arrayMensajesInicial: string[] = [
    "Te despiertas en una cabina dentro de un crucero, con un " +
    "brazalete que muestra el número \"5\". Logras escapar de la habitación y te " +
    "encuentra con otros ocho pasajeros.",
    "La persona que los ha secuestrado anuncia a través de un altavoz " +
    "que los nueve son participantes de lo que el ha llamado el Juego Nonario." +
    " La persona que los ha secuestrado se hace llamar Zero",
    "Zero explica las reglas del juego este afirma que cada uno " +
    "lleva un explosivo en el estómago que se disparará si intentan " +
    "pasar por alto las cerraduras digitales de las puertas que se encuentran en " +
    "cada una de las habitaciones que deben pasar para ganar el juego.",
    "Los ocho pasajeros tienen un brazalete que muestra uno de los numeros del 1 al 9 " +
    "tu eres el 5, las puertas tienen un numero escrito a los que tienen que cruzar dividiendose en " +
    "grupo, esta la puerta 4 y 5 ¿Que puerta escoges?"
];

const arrayMensajes1: string[] = [
    "Haz cruzado la puerta 4, con 3 personas ademas de ti, se encuentran en el camarote del capitan " +
    "al final de la habitacion hay una puerta cerrada, que para abrirse deberan ingresar un codigo" +
    " que deberan encontrar resolviendo acertijos encontrados en la habitación",
    "Te despiertas en una cabina dentro de un crucero, con un " +
    "brazalete que muestra el número \"5\". Logras escapar de la habitación y te " +
    "encuentra con otros ocho pasajeros.",
    "Zero explica las reglas del juego este afirma que cada uno " +
    "lleva un explosivo en el estómago que se disparará si intentan " +
    "pasar por alto las cerraduras digitales de las puertas que se encuentran en " +
    "cada una de las habitaciones que deben pasar para ganar el juego.",
    "12342343242q34"
];

const arrayMensajes2: string[] = [
    "Haz cruzado la puerta 5, con 4 personas ademas de ti, se encuentran en la cocina del crucero " +
    "al final de la cocina hay una puerta cerrada, para abrirse deberan encontrar la tarjeta del lector," +
    " la cocina posee un congelador, un horno, y una caja fuerte posiblemente la tarjeta se encuentre ahi",
    "Te despiertas en una cabina dentro de un crucero, con un " +
    "brazalete que muestra el número \"5\". Logras escapar de la habitación y te " +
    "encuentra con otros ocho pasajeros.",
    "Zero explica las reglas del juego este afirma que cada uno " +
    "lleva un explosivo en el estómago que se disparará si intentan " +
    "pasar por alto las cerraduras digitales de las puertas que se encuentran en " +
    "cada una de las habitaciones que deben pasar para ganar el juego.",
    "pouikjnhwertyrevbd"
];

export default function () {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [contador, setContador] = useState(-1);
    const [bandera1, setBandera1] = useState(0);
    const [bandera2, setBandera2] = useState(0);
    const [arrayMensajes, setArrayMensajes] = useState(arrayMensajesInicial);
    const [mensaje, setMensaje] = useState(arrayMensajes.at(contador));
    const [opcionElegida, setOpcionElegida] = useState(false);

    useEffect(
        () => {
            socket.on('connect', () => {
                setIsConnected(true);
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
            });
            socket.on('escucharEventoRecibirTexto', (data: {cont:number, mensaje: string}) => {
                setMensaje(data.mensaje);
                setContador(data.cont);
                setOpcionElegida(false);
            });
            socket.on('escucharEventoRecibirBandera', (data: {bandera:number, opcion:number}) => {
                if(data.opcion == 1){
                    setBandera1(data.bandera);
                    if(data.bandera==2){
                        setArrayMensajes(arrayMensajes1);
                        inicializarBanderas();
                    }
                }
                else if (data.opcion == 2){
                    setBandera2(data.bandera);
                    if(data.bandera==2){
                        setArrayMensajes(arrayMensajes2);
                        inicializarBanderas();
                    }
                }
            });
        },[]
    );

    const cambiarMensaje = (cont: number) => {
        if(cont == 3){
            cont = -1;
        }
        const textoMensaje = {
            cont: cont+1,
            mensaje: arrayMensajes.at(cont+1)
        };
        socket.emit(
            'recibirTexto',
            textoMensaje,
            () => {
                setMensaje(textoMensaje.mensaje);
                setContador(textoMensaje.cont);
                setOpcionElegida(false);
            }
        )
    }

    const inicializarBanderas = () =>{
        setBandera1(0);
        setBandera2(0);
    }

    useEffect(
        ()=>{
            cambiarMensaje(contador);
        },[arrayMensajes]
    )

    const cambiarBandera = (bandera: number, opcion: number) => {
        const banderaMensaje = {
            bandera:bandera+1,
            opcion:opcion
        }
        socket.emit(
            'recibirBandera',
            banderaMensaje,
            () => {
                console.log('recibirBandera', banderaMensaje);
                if(banderaMensaje.opcion==1){
                    setBandera1(banderaMensaje.bandera);
                    if(banderaMensaje.bandera==2){
                        setArrayMensajes(arrayMensajes1);
                        inicializarBanderas();
                    }
                }
                if(banderaMensaje.opcion==2){
                    setBandera2(banderaMensaje.bandera);
                    if(banderaMensaje.bandera==2){
                        setArrayMensajes(arrayMensajes2);
                        inicializarBanderas();
                    }
                }
            }
        )
    }

    useEffect(
        ()=>{
            tomarDecision();
        },[opcionElegida]
    )

    const tomarDecision = ()=>{
        if(contador == 3){
            if(!opcionElegida){
                return <>
                    <button onClick={()=>{
                        cambiarBandera(bandera1, 1);
                        setOpcionElegida(true);
                    }}>Cruzar puerta 4</button>
                    <button onClick={()=>{
                        cambiarBandera(bandera2, 2);
                        setOpcionElegida(true);
                    }}>Cruzar puerta 5</button>
                </>
            }
            else {
                return <></>
            }
        }
        else {
            return <>
                <button onClick={()=>{
                    cambiarMensaje(contador);
                }}>
                    Avanzar
                </button>
            </>
        }
    }

    const absCenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    };

    const group = {
      width: '650px',
    };

    return (
        <div className="container">
            <div style={absCenter}>
                <div style={group}>
                    <h1>
                        Aventura Narrativa
                    </h1>
                    <br/>
                    <div>{mensaje}</div>
                    {tomarDecision()}
                </div>
            </div>
        </div>
    );
}