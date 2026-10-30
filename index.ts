console.log(`[tbarchiver4]: Starting on ${new Date().toString()}`);
import { readFile } from 'fs/promises';

import io from 'socket.io-client';

import type { BotConfig } from './src/interfaces/botConfig.ts';
import type { MessageData, UserJoinLeftData, RoomChangeData, NickChangeData } from './src/interfaces/events.ts';

import { writeToDisk } from './src/functions/writeToDisk.ts';

const config = JSON.parse(await readFile('config.json', 'utf-8')) as BotConfig;
const socket: SocketIOClient.Socket = io('http://windows93.net:8081');

socket.on('_connected', () => {
    console.log(`[tbarchiver4]: Connected to Trollbox's socket, emitting user join event.`);
    socket.emit('user joined', `${config.name} (${config.prefix})`, config.color, '', '', '');
})

socket.on('message', async (data: MessageData) => {
    if(data.msg.startsWith(`${config.prefix}info`)
    || data.msg.startsWith(`${config.prefix}help`)) socket.send(config.infoMsg);
    try {
        await writeToDisk(data, "message", config.format);
    } catch(err) {
        console.error(`[tbarchiver4]: Error writing message event to disk: ${err}`);
        return;
    }
    console.log(`[tbarchiver4]: Wrote message event to disk`);
});
socket.on('user joined', async (data: UserJoinLeftData) => {
    try {
        await writeToDisk(data, "user_join", config.format);
    } catch(err) {
        console.error(`[tbarchiver4]: Error writing user join event to disk: ${err}`);
    }
    console.log(`[tbarchiver4]: Wrote user join event to disk`);
});
socket.on('user left', async (data: UserJoinLeftData) => {
    try {
        await writeToDisk(data, "user_left", config.format);
    } catch(err) {
        console.error(`[tbarchiver4]: Error writing user left event to disk: ${err}`);
    }
    console.log(`[tbarchiver4]: Wrote user left event to disk`)  ;
});
socket.on('user change nick', async (raw: any) => {
    const data: NickChangeData = {
        originalNick: raw[0],
        newNick: raw[1]
    };
    try {
        await writeToDisk(data, "nick_change", config.format);
    } catch(err) {
        console.error(`[tbarchiver4]: Error writing nick change event to disk: ${err}`);
    }
    console.log(`[tbarchiver4]: Wrote nick change event to disk`);
});
socket.on('user change room', async (raw: any) => {
    const data: RoomChangeData = {
        user: raw[0],
        room: raw[1]
    };
    try {
        await writeToDisk(data, "room_change", config.format);
    } catch(err) {
        console.error(`[tbarchiver4]: Error writing room change event to disk: ${err}`);
    }
    console.log(`[tbarchiver4]: Wrote room change event to disk`);
})