export interface DiscordEmbedParams {
    embeds: [{
        title: string;
        description: string;
        color: number;
        fields: Array<DiscordEmbedFields>;
    }];
}
export interface DiscordEmbedFields {
    name: string;
    value: string;
}