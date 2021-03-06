const request = require('request')
const config = require('./config.json')
const prefix = config.prefix

exports.github = function (bot, Discord, message) {
  if (message.content.startsWith(prefix + 'github')) {
    const username = message.content.split(' ')
    console.log(username[1])
    const options = {
      url: `https://api.github.com/search/users?q=${username[1]}&type=user`,
      headers: {
        'User-Agent': 'request'
      }
    }

    request.get(options, (err, resp, data) => {
      console.log(err)
      const json = JSON.parse(data)
      console.log(json)
      message.channel.send(`${json.items[0].html_url}?tab=repositories`)
    })
  };
}

exports.repo = function (bot, Discord, message) {
  if (message.content.startsWith(prefix + 'repo')) {
    const repo = message.content.split(' ')
    console.log(repo[1])
    console.log(repo[2])
    const received = {
      url: `https://api.github.com/repos/${repo[1]}/${repo[2]}`,
      headers: {
        'User-Agent': 'request'
      }
    }

    request.get(received, (err, resp, data) => {
      console.log(err)
      const json = JSON.parse(data)
      console.log(json)
      message.channel.send(`${json.html_url}`)

      const embed = new Discord.RichEmbed()
        .setTitle(`${json.name}`)
        .setDescription(`${json.description}`)
        .setColor(0x000000)
        .addField('Stars', `${json.stargazers_count}`)
        .addField('Langage', `${json.language}`)
        .addField('Derniere MAJ', `${json.updated_at}`)
      message.channel.send({
        embed
      })
    })
  };
}
