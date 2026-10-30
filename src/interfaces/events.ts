export interface MessageData {
    date: number;
    nick: string;
    color: string;
    style: string;
    home: string;
    msg: string;
};
// The data is identical for both user joining and leaving events
export interface UserJoinLeftData {
    nick: string;
    color: string;
    style: string;
    home: string;
    room: string;
    isBot: boolean;
};
/*
    Jankencode at its finest...
    [
    {
        date: 1793371043548,
        nick: 'MaidJaxFan',
        home: '0fd4f7dadedf6264807a0fb67f68650d0d23ff191ea30236c6a3de1bad1b23a9',
        color: 'pink'
    },
    { nick: 'tbArchiver4TestL', color: '#ff00ff' }
    ]   

    What Was He Thinking?
*/
export interface RoomChangeData {
    user: {
        date: number;
        nick: string;
        home: string;
        color: string;
    }
    room: {
        nick: string;
        color: string;
    }
};
export interface NickChangeData {
    originalNick: {
        nick: string,
        color: string,
        style: string
    },
    newNick: {
        nick: string,
        color: string,
        style: string,
        home: string,
        room: string,
        isBot: boolean
    }
};