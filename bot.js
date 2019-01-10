#!/usr/bin/env nodejs
//Settings!

// Config

config = require('./config.json');
prefix = config.prefix;
adminprefix = config.adminprefix;
yourID = config.yourID;
botToken = config.botToken;
servToken = config.servToken;
muted = config.muted;
channelmod= config.channelmod;
logs = config.logs;
roch = config.rolechan;
role = require('./roles.json');


var roleDemander = "none";
let time = 500;

const version = "v2.0.1"; // Creation d'une variable de la version du bot


// ----------------------------- //


// Commandes spéciales Program'Ligue //

const roles = role.list
// ------------------------------------------ //

// Anti-spam //

var spammeur = [];
var cooldown = 900;
var tpsPrison = 5000;

// ----------------------------------------- //


//Chargement du bot
const Discord = require('discord.js');
const bot = new Discord.Client();



bot.on('ready', () =>  {
 	bot.user.setStatus("online"); //dnd , online , ldle
	bot.user.setPresence({ game: { name: `${prefix}help - ${bot.guilds.get(servToken).memberCount} programmeurs !`, type: 0 } });
  //	console.log(bot.guilds.get("510121365140013056"));
  console.log(`Logged in as ${bot.user.tag}!`);

  let logembed = new Discord.RichEmbed()
  .setTitle("Bot Logs")
  .setColor(0xf36060)
  .addField("**BOT :**", "*REBOOTED*");


  setTimeout(function(){
    bot.guilds.get(servToken).channels.get(logs).send(logembed)
  }, 1500);


  //Roles

    bot.guilds.get(servToken).channels.get(roch).bulkDelete(5);

  let json = role.web;
  let embed = new Discord.RichEmbed()
   .setColor(0x0076c2)
   .setDescription("Réagissez aux langages que vous utilisez !")
   .addField("**WEB**", strEmbedRole(json));
    bot.guilds.get(servToken).channels.get(roch).send({embed}).then(function (message){
         for (let i = 0; i < json.length; i++) {
       console.log(i);
       setTimeout(function (){message.react(json[i].info[0]);}, time);
       time = time + 500;
     }
   });

  let json1 = role.logiciel;
   embed = new Discord.RichEmbed()
    .setColor(0x0076c2)
    .setDescription("Réagissez aux langages que vous utilisez !")
    .addField("**LOGICIEL**", strEmbedRole(json1));
     bot.guilds.get(servToken).channels.get(roch).send({embed}).then(function (message){
          for (let i = 0; i < json1.length; i++) {
        console.log(i);
        setTimeout(function (){message.react(json1[i].info[0]);}, time);
        time = time + 500;
      }
    });

    json2 = role.poo;
    embed = new Discord.RichEmbed()
     .setColor(0x0076c2)
     .setDescription("Réagissez aux langages que vous utilisez !")
     .addField("**POO**", strEmbedRole(json2));
      bot.guilds.get(servToken).channels.get(roch).send({embed}).then(function (message){
           for (let i = 0; i < json2.length; i++) {
         console.log(i);
         setTimeout(function (){message.react(json2[i].info[0]);}, time);
         time = time + 500;
       }
     });

     json3 = role.wtf;
     embed = new Discord.RichEmbed()
      .setColor(0x0076c2)
      .setDescription("Réagissez aux langages que vous utilisez !")
      .addField("**WTF**", strEmbedRole(json3));
       bot.guilds.get(servToken).channels.get(roch).send({embed}).then(function (message){
            for (let i = 0; i < json3.length; i++) {
          console.log(i);
          setTimeout(function (){message.react(json3[i].info[0]);}, time);
          time = time + 500;
        }
      });

      json4 = role.os;
      embed = new Discord.RichEmbed()
       .setColor(0x0076c2)
       .setDescription("Réagissez aux OS que vous utilisez !")
       .addField("**OS**", strEmbedRole(json4));
        bot.guilds.get(servToken).channels.get(roch).send({embed}).then(function (message){
             for (let i = 0; i < json4.length; i++) {
           console.log(i);
           setTimeout(function (){message.react(json4[i].info[0]);}, time);
           time = time + 500;
         }
       });
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

  let online = message.guild.members.filter(member => member.presence.status === "online").size; // Filtrage des personnes en lignes
  const user = message.mentions.users.first();
  const member = message.guild.member(user);

  if (message.content === "<@510590318568144896>") {

    message.channel.send(`Mon prefix est ${prefix}`);
    message.channel.send(`Si tu as besoin d'aide : ${prefix}help`);

  }

  if (message.content === prefix + "help"){ //Affiche les commandes disponibles
    message.delete();

      const embed = new Discord.RichEmbed()
      .setTitle("Liste des commandes :")
      .setColor(0x60e7f3)
      .addField(`${prefix}help`, "Affiche les commandes disponibles")
      .addField(`${prefix}admin`, "Affiche les commandes administateur")
      .addField(`${prefix}news`, "Affiche les actualitées du monde de l'informatique")
      .addField(`${prefix}langage`, "Vous envoi les langages disponible sur le serveur")
      .addField(`${prefix}server-info`, "Affiche les informations du serveur")
      .addField(`${prefix}bot-info`, "Affiche les informations du bot")
      .setFooter(`Demandé par ${message.author.username}`, message.author.avatarURL);
      message.channel.send({embed});

    }

    if(message.content === prefix + "server-info"){ // Commande d'information du serveur
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

    if (message.content === prefix + "langage"){ //Envoi un mp Ã  l'utilisateur avec les langages du serveur sous forme d'embed
        message.delete();
        let embed = new Discord.RichEmbed()
        .setTitle("Liste des langages disponible sur le serveur")
        .setColor(0x60e7f3)
        .addField(roles, "Si vous maitrisez un langage qui n'est pas dans cette liste, informez les Administateur du serveur");
        message.author.send({embed});
}

  if (message.content === prefix + "news"){ //Envoi les news quand l'utilisateur les demande
    message.delete();

    message.reply(`Voici les dernieres news : http://www.phoenixjp.net/news/fr/news.php?nbnews=100&`);

  }

  if(message.content === prefix + "bot-info"){ // Commande d'information du bot
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

  // Commandes admins


  if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "admin")){
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
      message.channel.send({embed});
  }

  else if (!message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "admin")) {
    message.channel.send(`Vous n'avez pas les droits d'utiliser cette commande ${message.author} !`);
  }

    // Clear

    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "clear")){

let args = message.content.split(' '); // Creation des arguments

  if (args[1] == 0) {
    message.channel.send("Vous ne pouvez pas supprimer 0 messages");
  }

  if (args[1] == null) {
    args[1]+1;
    message.channel.send("Vous devez spécifier le nombre de message à supprimer");
  }

   if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.bulkDelete(args[1]);

          const embed = new Discord.RichEmbed()
            .setTitle("Message de moderation :")
            .setColor(0x64db2e)
            .addField("Des messages ont été supprimés", `Par ${message.author.username}`)
            .addField("Nombre de message ",args[1]-1)
              message.guild.channels.get(logs).send({embed});
            }


      }

  else if (!message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "clear")) {
    message.channel.send(`Vous n'avez pas les droits d'utiliser cette commande ${message.author} !`);

  }




  //kick

  if(message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "kick")){

      member.kick('Raison').then(() => {
        message.reply(`${user.tag} à  été exclu !`);
      }).catch(err => {

          message.reply('Je n\'ai pas pu exclure ce membre ! ');

          console.error(err);
        });
    }

    //ban

  if(message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "ban")){

      member.ban('Raison').then(() => {
        message.reply(`${user.tag} à  été banni !`);
      }).catch(err => {

          message.reply('Je n\'ai pas pu bannir ce membre ! ');

          console.error(err);
        });
    }

    //mute
  if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "mute")){
      member.addRole(muted);
      message.channel.send(`Taisez-vous ${member} !`);
      const embed = new Discord.RichEmbed()
                          .setTitle("Message de moderation :")
                          .setColor(0xf44242)
        .addField("Un utilisateur à  été mute", `Par ${message.author.username}`)
                          .addField("Username :", member)
        .addField("Raison :", message.member.lastMessage)
                      message.guild.channels.get(logs).send({embed});
    };

    //unmute
  if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(prefix + "unmute")){
      member.removeRole(muted);
      message.channel.send(`Vous pouvez de nouveau parler ${member}`);
      const embed = new Discord.RichEmbed()
                          .setTitle("Message de moderation :")
                          .setColor(0x64db2e)
        .addField("Un utilisateur à  été unmute", `Par ${message.author.username}`)
                          .addField("Username :", member)

                      message.guild.channels.get(logs).send({embed});
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
                      message.guild.channels.get(logs).send({embed});

    }

    //anti-spam
  var now = Math.floor(Date.now());
    if ((message.author.id != bot.user.id) && message.channel.guild) {
        console.log("c'est bien un user");
        console.log(spammeur.find(auth => auth.author === message.author.id));
        if (spammeur.find(auth => auth.author === message.author.id) === undefined) {
            console.log("n'inclus pas ce mec");
            spammeur.push({
                "time": now,
                "author": message.author.id
            });
            setTimeout(function() {spammeur.splice(spammeur.findIndex(auth => auth.author === message.author.id),1);}, cooldown+1);
            console.log(spammeur);
            return;
        }
    }

    if (spammeur.find(auth => auth.author === message.author.id) != undefined) {
        console.log("trouvé!");
        var index = spammeur.findIndex(auth => auth.author === message.author.id);
        console.log(index);
        if (spammeur[index].time >= now - cooldown) {
            console.log("spam!");
            message.member.addRoles(muted);
            message.reply("Pas de spam !")
            setTimeout(function() {message.member.removeRoles(muted);}, tpsPrison);
            spammeur.splice(index, 1);
            console.log(spammeur);
    const embed = new Discord.RichEmbed()
                        .setTitle("Message de moderation :")
                        .setColor(0xf44242)
      .addField("Un utilisateur à  été mute", `Par : Anti-spam`)
                        .addField("Username :", message.author.username)
      .addField("Dernier message :", message.author.lastMessage)
                    message.guild.channels.get(logs).send({embed});

        }
    }

    // --------------------------------------- //

});

function testRole(emote) {
  for (var i = 0; i < role.web.length; i++) {
    if (emote === role.web[i].info[0]) {
      return role.web[i].info[2];
    }
  }
  for (var i = 0; i < role.logiciel.length; i++) {
    if (emote === role.logiciel[i].info[0]) {
      return role.logiciel[i].info[2];
    }
  }

for (var i = 0; i < role.poo.length; i++) {
  if (emote === role.poo[i].info[0]) {
    return role.poo[i].info[2];
  }
}

for (var i = 0; i < role.wtf.length; i++) {
  if (emote === role.wtf[i].info[0]) {
    return role.wtf[i].info[2];
  }
}

for (var i = 0; i < role.os.length; i++) {
  if (emote === role.os[i].info[0]) {
    return role.os[i].info[2];
  }
}
return "none";
}


function strEmbedRole(list){
  let strContent = "";
  // console.log(list);
for (var i = 0; i < list.length; i++) {
    strContent = strContent + list[i].info[1];
    strContent = strContent + role.spe[1];
  }
  return strContent;
}


bot.on("messageReactionAdd", (reaction, user) => { // on a joute une react
  if (reaction.message.channel.id == roch) { // si la react est dans le channel(id) "config.cRoleID"
  if (user.id !== bot.user.id){ // si c'est pas le bot qui ajoute la react
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
  if (user.id !== bot.user.id){
    console.log("coucou ta mere");
    if (testRole(reaction.emoji.id) !== "none") {
      console.log(testRole(reaction.emoji.id));
      bot.guilds.get(servToken).members.get(user.id).removeRole(bot.guilds.get(servToken).roles.get(testRole(reaction.emoji.id))); // ajoute le role
    }
  }

}

});



bot.login(botToken);
