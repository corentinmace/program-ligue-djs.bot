#!/usr/bin/env nodejs //ligne pour créer une service sur VPS
//Settings!
config = require('./config.json');
const setupCMD = "!messagerolebotprogramliguefr"
let initialMessage = `**Ajoutez une reaction sur chaque langage que vous utilisez**`;
const roles = ["HTML/CSS", "SQL", "Java", "C#", "C", "C++", "Javascript","Arduino", "PHP", "Processing", "Unity", "ReactJS", "Python", "Kornshell", "MacOS", "Linux", "NodeJS", "Bash", "OCaml", "Brainfuck", "Swift", "Angular","ASM"];
const reactions = ["510232875757600768", "510234429298311188", "510232984893259817", "510233913990316032","510233630476599312", "510233711288254488", "510233055865077760", "510233690543095808", "510234482972950529", "510233373684400138", "511459088866082823", "510233175449141258", "510234111835635722","511459435319656448", "510235681642250250","510235607872700416","510233993816440832", "510234161055924230", "511459281963450399", "511461185388806145", "511647759430975488", "511647990734389261","512172140963823617"];
prefix = config.prefix;
adminprefix = config.adminprefix;
yourID = config.yourID;
botToken = config.botToken;
servToken = config.servToken;
muted = config.muted;




//Chargement du bot
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login(botToken);

bot.on('ready', () => {
 	bot.user.setStatus("online"); //dnd , online , ldle
	bot.user.setPresence({ game: { name: `${prefix}aide - ${bot.guilds.get(servToken).memberCount} programmeurs !`, type: 0 } });
  	console.log(bot.guilds.get("510121365140013056"));
		setInterval(function(){
  bot.guilds.get("510121365140013056").channels.get("510361312329465877").send("Voici les derniÃ¨res news : http://www.phoenixjp.net/news/fr/news.php?nbnews=100&");
		},10800000 ); // Affiche les news toutes les 3 heures
  console.log("Le bot est pret !");

});




//Message de bienvenue
 	bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'bienvenue');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Yo ${member}, bienvenue sur Program'Ligue FR , n'hÃ©site pas a inviter tes amis programmeur !
	Lis en prioritÃ© les <#510197684322435083> avant de faire quoi que ce soit !
	Bon code !`);
		member.addRole(config.baseRole)
});



//Prevenir l'user que la liste des roles et des reactions ne font pas la meme longueur
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Genere le message
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Cliquez sur **"${role}"**`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);
                }
            });
        }
    }
});


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){

        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);

        if (msg.author.id == bot.user.id && msg.content != initialMessage){

            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];

            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);

                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })

    }
});
bot.on('message', message =>  {
		if (message.content === prefix + "news"){ //Envoi les news quand l'utilisateur les demande

   	message.reply('Voici les dernieres news : http://www.phoenixjp.net/news/fr/news.php?nbnews=100&');
	     console.log("news envoyees")};


		if (message.content === prefix + "langage"){ //Envoi un mp Ã  l'utilisateur avec les langages du serveur sous forme d'embed
				var embed = new Discord.RichEmbed()
				.setTitle("Liste des langages disponible sur le serveur")
				.setColor(0xFFFFFF)
				.addField(roles, "Si vous maitrisez un langage qui n'est pas dans cette liste, informez les Administateur du serveur");
				message.author.send({embed});
}

		if (message.content === prefix + "help"){ //Affiche les commandes disponibles
				const embed = new Discord.RichEmbed()
  			.setTitle("Liste des commandes :")
  			.setColor(0xFFFFFF)
				.addField(".help", "Affiche les commandes disponibles")
  			.addField(".news", "Affiche les actualitÃ©es du monde de l'informatique")
				.addField(".langage", "Vous envoi les langages disponible sur le serveur");
				message.channel.send({embed});


		}
});


bot.on('message', function(message) {
    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(adminprefix + "clear")){
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")});
        }
    }
    if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(adminprefix + "help")){
        const embed = new Discord.RichEmbed()
        .setTitle("Liste des commandes admin :")
        .setColor(0xFFFFFF)
			 	.addField("!?help", "Affiche les commandes disponibles")
        .addField("!?kick [@user]", "Expulse l'utilisateur mentionnÃ©(e)")
        .addField("!?ban [@user]", "Banni l'utilisateur mentionnÃ©(e)")
				.addField("!?mute [@user]", "Mute l'utilisateur mentionnÃ©(e)")
				.addField("!?unmute [@user]", "Unmute l'utilisateur mentionnÃ©(e)");
        message.channel.send({embed});
    }

});


bot.on('message', message => {
	const user = message.mentions.users.first();
	const member = message.guild.member(user);


	if(message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(adminprefix + "kick")){

    	member.kick('Raison').then(() => {
				message.reply(`${user.tag} a  été exclu !`);
			}).catch(err => {

          message.reply('Je n\'ai pas pu exclure ce membre ! ');

          console.error(err);
        });
		}
	if(message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(adminprefix + "ban")){

    	member.ban('Raison').then(() => {
				message.reply(`${user.tag} a  été banni !`);
			}).catch(err => {

          message.reply('Je n\'ai pas pu bannir ce membre ! ');

          console.error(err);
        });
		}
	if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(adminprefix + "mute")){
			member.addRole(muted);
			message.reply("Utilisateur mute");
		};
	if (message.member.hasPermission('BAN_MEMBERS') && message.content.startsWith(adminprefix + "unmute")){
			member.removeRole(muted);
			message.reply("Utilisateur unmute");
		};

});
