config = require('./config.json');
const request = require("request");

exports.github = function(bot, Discord, message) {
    if (message.content.startsWith(prefix + "github")) {
        const username = message.content.split(" ");
        console.log(username[1]);
        const options = {
            url: `https://api.github.com/search/users?q=${username[1]}&type=user`,
            headers: {
                'User-Agent': 'request',
            }
        }



        request.get(options, (err, resp, data) => {
            console.log(err);
            const json = JSON.parse(data);
            console.log(json)
            message.channel.send(`${json.items[0].html_url}?tab=repositories`);
        })

    };

}
exports.repo = function(bot, Discord, message) {
  if (message.content.startsWith(prefix + "repo")){
    const repo = message.content.split(" ");
      console.log(repo[1]);
      console.log(repo[2]);
    message.channel.send(`https://github.com/${repo[1]}/${repo[2]}`);
  }
}
