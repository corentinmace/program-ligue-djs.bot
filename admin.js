config = require('./config.json');

muted = config.muted;

var spammeur = [];
var cooldown = 500;
var tpsPrison = 5000;

// Commandes admins

exports.admin = function(bot, Discord, message) {

    const user = message.mentions.users.first();
    const member = message.guild.member(user);

    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "admin")) {
        message.delete();
        const embed = new Discord.RichEmbed()
            .setTitle("Liste des commandes admin :")
            .setColor(0xf36060)
            .addField(`${prefix}admin`, "Affiche les commandes disponibles")
            .addField(`${prefix}clear [nombre]`, "Efface le nombre de messages souhaités")
            .addField(`${prefix}kick [@user]`, "Expulse l'utilisateur mentionne(e)")
            .addField(`${prefix}ban [@user]`, "Banni l'utilisateur mentionne(e)")
            .addField(`${prefix}mute [@user]`, "Mute l'utilisateur mentionne(e)")
            .addField(`${prefix}unmute [@user]`, "Unmute l'utilisateur mentionne(e)")
            .setFooter(`Demandé par ${message.author.username}`, message.author.avatarURL);
        message.channel.send({
            embed
        });
    } else if (!message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "admin")) {
        message.channel.send(`Vous n'avez pas les droits d'utiliser cette commande ${message.author} !`);
    }

    // Clear

    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "clear")) {

        let args = message.content.split(' '); // Creation des arguments

        if (args[1] == 0) {
            message.channel.send("Vous ne pouvez pas supprimer 0 messages");
        }

        if (args[1] == null) {
            args[1] + 1;
            message.channel.send("Vous devez spécifier le nombre de message à supprimer");
        }

        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.bulkDelete(args[1]); //.then(console.log(`Cleared ${args[1]} messages`));
            const embed = new Discord.RichEmbed()
                .setTitle("Message de moderation :")
                .setColor(0x64db2e)
                .addField("Des messages ont été supprimés", `Par ${message.author.username}`)
                .addField("Nombre de message ", args[1] - 1)
            message.guild.channels.get(logs).send({
                embed
            });
        }


    } else if (!message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "clear")) {
        message.channel.send(`Vous n'avez pas les droits d'utiliser cette commande ${message.author} !`);

    }




    //kick

    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "kick")) {

        member.kick('Raison').then(() => {
            message.channel.send(`${user.tag} à  été exclu !`);
            let args = message.content.split(' ');
            console.log(args);
            let skipped = args.slice(2);
            let reason = skipped.join(' ');
            if (reason === '') {
                message.channel.send("Vous n'avez pas précisé de raisons");
                reason = "Non précisée";
            }
            const embed = new Discord.RichEmbed()
                .setTitle("Message de moderation :")
                .setColor(0xf44242)
                .addField("Un utilisateur à  été exclu", `Par ${message.author.username}`)
                .addField("Username :", member)
                .addField("Raison :", reason);
            message.guild.channels.get(logs).send({
                embed
            });
        }).catch(err => {

            message.reply('Je n\'ai pas pu exclure ce membre ! ');

            console.error(err);
        });
    }

    //ban

    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "ban")) {

        member.ban('Raison').then(() => {
            message.channel.send(`${user.tag} à  été banni !`);
            let args = message.content.split(' ');
            console.log(args);
            let skipped = args.slice(2);
            let reason = skipped.join(' ');
            if (reason === '') {
                message.channel.send("Vous n'avez pas précisé de raisons");
                reason = "Non précisée";
            }
            const embed = new Discord.RichEmbed()
                .setTitle("Message de moderation :")
                .setColor(0xf44242)
                .addField("Un utilisateur à  été banni", `Par ${message.author.username}`)
                .addField("Username :", member)
                .addField("Raison :", reason)
            message.guild.channels.get(logs).send({
                embed
            });
        }).catch(err => {

            message.reply('Je n\'ai pas pu bannir ce membre ! ');

            console.error(err);
        });
    }

    //mute
    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "mute")) {
        member.addRole(muted);
        message.channel.send(`Taisez-vous ${member} !`);
        let args = message.content.split(' ');
        console.log(args);
        let skipped = args.slice(2);
        let reason = skipped.join(' ');
        if (reason === '') {
            message.channel.send("Vous n'avez pas précisé de raisons");
            reason = "Non précisée";
        }
        const embed = new Discord.RichEmbed()
            .setTitle("Message de moderation :")
            .setColor(0xf44242)
            .addField("Un utilisateur à  été mute", `Par ${message.author.username}`)
            .addField("Username :", member)
            .addField("Raison :", reason)
        message.guild.channels.get(logs).send({
            embed
        });
    }


    //unmute
    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "unmute")) {
        member.removeRole(muted);
        message.channel.send(`Vous pouvez de nouveau parler ${member}`);
        const embed = new Discord.RichEmbed()
            .setTitle("Message de moderation :")
            .setColor(0x64db2e)
            .addField("Un utilisateur à  été unmute", `Par ${message.author.username}`)
            .addField("Username :", member)

        message.guild.channels.get(logs).send({
            embed
        });
    };

    // Si le message contient pd
    if (message.content.includes("pd")) {
        console.log("Aya il a dit pd")
        message.channel.send('Pas d\'insulte !');
        message.member.addRole(muted);

        const embed = new Discord.RichEmbed()
            .setTitle("Message de moderation :")
            .setColor(0xf44242)
            .addField("Un utilisateur à  été mute", `Pour : Insulte`)
            .addField("Username :", message.author.username)
            .addField("Dernier message :", message.author.lastMessage)
        message.guild.channels.get(logs).send({
            embed
        });
    }
}

exports.antispam = function(bot, Discord, message) {
    //anti-spam
    var now = Math.floor(Date.now());
    if ((message.author.id != bot.user.id) && message.channel.guild) {
        //    console.log("c'est bien un user");
        //    console.log(spammeur.find(auth => auth.author === message.author.id));
        if (spammeur.find(auth => auth.author === message.author.id) === undefined) {
            //  console.log("n'inclus pas ce mec");
            spammeur.push({
                "time": now,
                "author": message.author.id
            });
            setTimeout(function() {
                spammeur.splice(spammeur.findIndex(auth => auth.author === message.author.id), 1);
            }, cooldown + 1);
            //  console.log(spammeur);
            return;
        }
    }

    if (!message.member.hasPermission('ADMINISTRATOR')) {

        if ((spammeur.find(auth => auth.author === message.author.id) != undefined)) {
            //  console.log("trouvé!");
            var index = spammeur.findIndex(auth => auth.author === message.author.id);
            console.log(index);
            if (spammeur[index].time >= now - cooldown) {
                console.log("spam!");
                message.member.addRoles(muted);

                message.reply("Pas de spam !")
                setTimeout(function() {
                    message.member.removeRoles(muted);
                }, tpsPrison);
                spammeur.splice(index, 1);
                const embed = new Discord.RichEmbed()
                    .setTitle("Message de moderation :")
                    .setColor(0xf44242)
                    .addField("Un utilisateur à  été mute", `Par : Anti-Spam`)
                    .addField("Username :", message.author.username)
                    .addField("Dernier message :", message.author.lastMessage)
                message.guild.channels.get(logs).send({
                    embed
                });
                console.log(spammeur);


            }
        }
    }
}

// --------------------------------------- //
