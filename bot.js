#!/usr/bin/env nodejs


// Config

config = require('./config.json');
prefix = config.prefix;
adminprefix = config.adminprefix;
yourID = config.yourID;
botToken = config.botToken;
servToken = config.servToken;
channelmod = config.channelmod;
logs = config.logs;
roch = config.rolechan;

rolejs = require('./roles.js');
testRole = rolejs.testRole;

adminrole = config.adminrole;
adminJS = require('./admin.js');

api = require('./api.js');

const roles = ["HTML/CSS", "SQL", "Java", "C#", "C", "C++", "Javascript", "Arduino", "PHP", "Processing", "Unity", "ReactJS", "Python", "Kornshell", "MacOS", "Linux", "NodeJS", "Bash", "OCaml", "Brainfuck", "Swift", "Angular", "ASM"];

const version = "v2.1.6"; // Creation d'une variable de la version du bot


// ----------------------------- //




//Chargement du bot
const Discord = require('discord.js');
const bot = new Discord.Client();



bot.on('ready', () => {
    bot.user.setStatus("online"); //dnd , online , ldle
    bot.user.setPresence({
        game: {
            name: `${prefix}help - ${bot.guilds.get(servToken).memberCount} programmeurs !`,
            type: 0
        }
    });
    //	console.log(bot.guilds.get("510121365140013056"));
    console.log(`Logged in as ${bot.user.tag}!`);

    let logembed = new Discord.RichEmbed()
        .setTitle("ACTIVITY LOG")
        .setColor(0xf36060)
        .addField("**BOT :**", "*REBOOTED*")
        .addField("AT :", new Date());


    setTimeout(function() {
        bot.guilds.get(servToken).channels.get(logs).send(logembed)
    }, 1500);


    //Roles
    RChan = bot.guilds.get(servToken).channels.get(roch)
    bot.guilds.get(servToken).channels.get(roch).bulkDelete(5);
    rolejs.web(Discord, RChan);
    rolejs.logiciel(Discord, RChan);
    rolejs.poo(Discord, RChan);
    rolejs.wtf(Discord, RChan);
    rolejs.os(Discord, RChan);

    // ------------ //

});

// ------------------------------------- //

//Message de bienvenue
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'bienvenue');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Yo ${member}, bienvenue sur Program'Ligue FR , n'hesite pas a inviter tes amis programmeur !
	Lis en prioritee les <#510197684322435083> avant de faire quoi que ce soit !
	Bon code !`);

    member.addRole(config.baseRole)
});



// ------------------------------------ //



// Commandes

bot.on('message', message => {

    // APIs

    api.github(bot, Discord, message);
    api.repo(bot, Discord, message);

    // ---------------------------------------- //

    let online = message.guild.members.filter(member => member.presence.status === "online").size; // Filtrage des personnes en lignes
    const user = message.mentions.users.first();
    const member = message.guild.member(user);

    if (message.content === "<@510590318568144896>") {

        message.channel.send(`Mon prefix est ${prefix}`);
        message.channel.send(`Si tu as besoin d'aide : ${prefix}help`);

    }

    if (message.content === prefix + "help") { //Affiche les commandes disponibles
        message.delete();

        const embed = new Discord.RichEmbed()
            .setTitle("Liste des commandes :")
            .setColor(0x60e7f3)
            .addField(`${prefix}help`, "Affiche les commandes disponibles")
            .addField(`${prefix}admin`, "Affiche les commandes administateur")
            .addField(`${prefix}news`, "Affiche les actualitées du monde de l'informatique")
            .addField(`${prefix}github [pseudo]`, "Envoi le github du pseudo entré")
            .addField(`${prefix}repo [pseudo] [repo]`, "Envoi le repositories de la personne demandé")
            .addField(`${prefix}langage`, "Vous envoi les langages disponible sur le serveur")
            .addField(`${prefix}server-info`, "Affiche les informations du serveur")
            .addField(`${prefix}bot-info`, "Affiche les informations du bot")
            .setFooter(`Demandé par ${message.author.username}`, message.author.avatarURL);
        message.channel.send({
            embed
        });

    }

    if (message.content === prefix + "server-info") { // Commande d'information du serveur
        message.delete(); // Supression de la commande d'invocation

        let serverembed = new Discord.RichEmbed() // Creation de l'embed
            .setDescription("**Informations du serveur**")
            .setColor(0x60e7f3)
            .addField("Nom du serveur :", message.guild.name, true)
            .addField("Owner :", message.guild.owner, true)
            .addField("Rejoins le", message.member.joinedAt)
            .addField("Crée le", message.guild.createdAt)
            .addField("Nombres de membres", message.guild.memberCount, true)
            .addField("En ligne :", online, true)
            .addField("Acronyme :", message.guild.nameAcronym, true)
            .addField("Region :", message.guild.region, true)
            .setFooter(`Demandé par ${message.author.username}`, message.author.avatarURL);
        return message.channel.send(serverembed); // Envoi de l'embed
    }

    if (message.content === prefix + "langage") { //Envoi un mp Ã  l'utilisateur avec les langages du serveur sous forme d'embed
        message.delete();
        let embed = new Discord.RichEmbed()
            .setTitle("Liste des langages disponible sur le serveur")
            .setColor(0x60e7f3)
            .addField(roles, "Si vous maitrisez un langage qui n'est pas dans cette liste, informez les Administateur du serveur");
        message.author.send({
            embed
        });
    }

    if (message.content === prefix + "news") { //Envoi les news quand l'utilisateur les demande
        message.delete();

        message.reply(`Voici les dernieres news : http://www.phoenixjp.net/news/fr/news.php?nbnews=100&`);

    }

    if (message.content === prefix + "bot-info") { // Commande d'information du bot
        message.delete(); // Supression de la commande d'invocation

        let serverembed = new Discord.RichEmbed() // Creation de l'embed
            .setDescription("**Informations du bot**")
            .setColor(0x60e7f3)
            .addField("Nom du Bot", bot.user.tag, true)
            .addField("Version", version, true)
            .addField("Prefix", prefix, true)
            .addField("Createur", "@Corentin `Kūhaku` Macé#1986", true)
            .setDescription("Bot crée pour le serveur de Program'Ligue FR")
            .setFooter(`Demandé par ${message.author.username}`, message.author.avatarURL);


        return message.channel.send(serverembed); // Envoi de l'embed
    }



    // ------------------------------------------ //

    adminJS.admin(bot, Discord, message);
    adminJS.antispam(bot, Discord, message);

    if (message.channel.id === "533244885151514635") {
        console.log("C'est le bon channel");
        if ((message.content === "modo") || (message.content === "helper")) {
            console.log("C'est une commande");
            message.delete();
            message.reply("Une demande à été envoyée au Administateurs du serveur. Il te contacteront en mp bientôt");
            bot.guilds.get(servToken).channels.get("532976996054073344").send(`${message.author.username} veut devenir ${message.author.lastMessage}`);
        } else if ((message.content !== "modo") || (message.content !== "helper")) {
            console.log("C'est pas une commande ça");
            console.log("not a command");
            bot.guilds.get(servToken).channels.get("533244885151514635");
            message.delete(10000);
        }
    }
});




bot.on("messageReactionAdd", (reaction, user) => { // on a joute une react
    if (reaction.message.channel.id == roch) { // si la react est dans le channel(id) "config.cRoleID"
        if (user.id !== bot.user.id) { // si c'est pas le bot qui ajoute la react
            console.log(testRole(reaction.emoji.id));
            if (testRole(reaction.emoji.id) !== "none") { // Si c'est une reaction correct
                bot.guilds.get(servToken).members.get(user.id).addRole(bot.guilds.get(servToken).roles.get(testRole(reaction.emoji.id))); // ajoute le role

            }
            //  reaction.remove(user); // Supprime la réaction
        }
    }

});

bot.on("messageReactionRemove", (reaction, user) => {

    if (reaction.message.channel.id == roch) {
        if (user.id !== bot.user.id) {
            if (testRole(reaction.emoji.id) !== "none") {
                console.log(testRole(reaction.emoji.id));
                bot.guilds.get(servToken).members.get(user.id).removeRole(bot.guilds.get(servToken).roles.get(testRole(reaction.emoji.id))); // ajoute le role
            }
        }

    }


});



bot.login(botToken);
