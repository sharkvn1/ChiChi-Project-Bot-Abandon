const { Events, Client, WelcomeChannel } = require('discord.js');
const guildConfig = require('../database/guildConfig')
module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * 
     * @param {Client} chichi 
     */
    async execute(chichi) {
        const data = chichi.guilds.cache.toJSON();
        for (const i in data) {
            await guildConfig.findOne({
                guildId: data[i].id
            }).then(Data => {
                if (Data === null) {
                    new guildConfig({
                        guildId: data[i].id,
                        WelcomeChannelId: 0
                    }).save();
                }
            });
        }
    }
}