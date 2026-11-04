import type { DiscordEmbedParams, DiscordEmbedFields } from "./interfaces/discordEmbedInterfaces.ts";
export class DiscordEmbed {
    embeds: DiscordEmbedParams;

    constructor(title: string, description: string, color: number) {
        this.embeds = {
            embeds: [{
                "title": title,
                "description": description,
                "color": color,
                "fields": []
            }]
        };
    }
    
    addField(field: DiscordEmbedFields) {
        this.embeds.embeds[0].fields.push(field);
    };

    addFields(fields: Array<DiscordEmbedFields>) {
        fields.forEach((v, i) => {
            this.embeds.embeds[0].fields.push(v);
        })
    }

    export() {
        return JSON.stringify(this.embeds); 
    }
}