//Settings!
const yourID = "184425060130357268"; 
const setupCMD = "!messagerolebotprogramliguefr"
let initialMessage = `**Ajoutez une reaction sur chaque langage que vous utilisez**`;
const roles = ["HTML/CSS", "SQL", "Java", "C#", "C", "C++", "Javascript","Arduino", "PHP", "Processing", "Unity", "ReactJS", "Python", "Kornshell", "MacOS", "Linux", "NodeJS", "Bash", "OCaml", "Brainfuck", "Swift", "Angular"];
const reactions = ["510232875757600768", "510234429298311188", "510232984893259817", "510233913990316032","510233630476599312", "510233711288254488", "510233055865077760", "510233690543095808", "510234482972950529", "510233373684400138", "511459088866082823", "510233175449141258", "510234111835635722","511459435319656448", "510235681642250250","510235607872700416","510233993816440832", "510234161055924230", "511459281963450399", "511461185388806145", "511647759430975488", "511647990734389261"];
const botToken = ""; /*You'll have to set this yourself; read more
                     here https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token*/

//Load up the bot...
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login(botToken);

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
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
})


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
