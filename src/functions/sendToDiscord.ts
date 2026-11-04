import { rejects } from "assert";
import { DiscordEmbed } from "../discordEmbeds.ts";
import type { MessageData, NickChangeData, RoomChangeData, UserJoinLeftData } from "../interfaces/events.ts";
import { decode } from 'html-entities';
export async function sendToDiscord(data: MessageData | UserJoinLeftData | RoomChangeData | NickChangeData, event_type: string, webhook: string) {
    switch (event_type) {
        case "message":
            console.log(`[tbarchiver4]: Sending message event to Discord`)
            const msgData = data as MessageData;

            var embed = new DiscordEmbed(`Message from ${decode(msgData.nick)}`, decode(msgData.msg), 139);
            var fields = [
                {
                    "name": "Date",
                    "value": new Date(msgData.date).toString()
                },
                {
                    "name": "Home",
                    "value": msgData.home
                }
            ];

            embed.addFields(fields);

            await _fetch(webhook, embed, "message");

            break;
        case "user_join":
            console.log(`[tbarchiver4]: Sending user join event to Discord`);
            const userJoinData = data as UserJoinLeftData;

            var embed = new DiscordEmbed(`User joined: ${decode(userJoinData.nick)}`, ``, 139);

            var fields = [
                {
                    "name": "Home",
                    "value": userJoinData.home
                }
            ];

            embed.addFields(fields);

            await _fetch(webhook, embed, "user_join")
            break;
        case "user_left":
            console.log(`[tbarchiver4]: Sending user left event to Discord`);
            const userLeftData = data as UserJoinLeftData;

            var embed = new DiscordEmbed(`User joined: ${decode(userLeftData.nick)}`, ``, 139);

            var fields = [
                {
                    "name": "Home",
                    "value": userLeftData.home
                }
            ];

            embed.addFields(fields);

            await _fetch(webhook, embed, "user_left")
            break;
        case "room_change":
            console.log(`[tbarchiver4]: Sending room change event to Discord`);
            const roomChangeData = data as RoomChangeData;

            var embed = new DiscordEmbed(`User changed room: ${decode(roomChangeData.user.nick)}`, ``, 139);

            var fields = [
                {
                    "name": "New room",
                    "value": decode(roomChangeData.room.nick)
                },
                {
                    "name": "Home",
                    "value": roomChangeData.user.home
                },
                {
                    "name": "Date",
                    "value": new Date(roomChangeData.user.date).toString()
                }
            ];

            embed.addFields(fields);

            await _fetch(webhook, embed, "user_left")
            break;
        case "nick_change":
            console.log(`[tbarchiver4]: Sending nick change event to Discord`);
            const nickChangeData = data as NickChangeData;

            var embed = new DiscordEmbed(`User changed nick: ${decode(nickChangeData.originalNick.nick)}`, ``, 139);

            var fields = [
                {
                    "name": "New nick",
                    "value": decode(nickChangeData.newNick.nick)
                },
                {
                    "name": "Home",
                    "value": decode(nickChangeData.newNick.home)
                },
                {
                    "name": "Old color",
                    "value": decode(nickChangeData.originalNick.color)
                },
                {
                    "name": "New color",
                    "value": decode(nickChangeData.newNick.color)
                },
            ];

            embed.addFields(fields);

            await _fetch(webhook, embed, "user_left")
            break;
    }
}
async function _fetch(webhook: string, embed: DiscordEmbed, event_type: string) {
    const res = await fetch(webhook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: embed.export()
    })
    if (!res.ok) {
        switch (res.status) {
            case 429:
                console.error(`[tbarchiver4]: Discord returned 429 Too Many Requests`)
                break;
            default:
                console.error(`[tbarchiver4]: Discord returned ${res.status} ${res.statusText}`)
                break;
        }
    } else {
        switch (event_type) {
            case "message":
                console.log(`[tbarchiver4]: Message event sent successfully`)
                break;
            case "user_join":
                console.log(`[tbarchiver4]: User join event sent successfully`)
                break;
            case "user_left":
                console.log(`[tbarchiver4]: User left event sent successfully`)
                break;
            case "room_change":
                console.log(`[tbarchiver4]: Room change event sent successfully`)
                break;
            case "nick_change":
                console.log(`[tbarchiver4]: Nick change event sent successfully`)
                break;
        }

    }
}