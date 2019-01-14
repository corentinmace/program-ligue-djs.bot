const role = require('./roles.json')
const config = require('./config')
const roles = role.list
let time = 500

exports.web = function(Discord, channel) {
  let json = role.web
  let embed = new Discord.RichEmbed()
    .setColor(0x0076c2)
    .setDescription('Réagissez aux langages que vous utilisez !')
    .addField('**WEB**', strEmbedRole(json))
  channel.send({
    embed
  }).then(function (message) {
    for (let i = 0; i < json.length; i++) {
      console.log(i)
      setTimeout(function () {
        message.react(json[i].info[0])
      }, time)
      time = time + 500
    }
  })
}

exports.logiciel = function (Discord, channel) {
  let json1 = role.logiciel
  embed = new Discord.RichEmbed()
    .setColor(0x0076c2)
    .setDescription('Réagissez aux langages que vous utilisez !')
    .addField('**LOGICIEL**', strEmbedRole(json1))
  channel.send({
    embed
  }).then(function (message) {
    for (let i = 0; i < json1.length; i++) {
      console.log(i)
      setTimeout(function () {
        message.react(json1[i].info[0])
      }, time)
      time = time + 500
    }
  })
}

exports.poo = function(Discord, channel) {
  json2 = role.poo
  embed = new Discord.RichEmbed()
    .setColor(0x0076c2)
    .setDescription('Réagissez aux langages que vous utilisez !')
    .addField('**POO**', strEmbedRole(json2))
  channel.send({
    embed
  }).then(function (message) {
    for (let i = 0; i < json2.length; i++) {
      console.log(i)
      setTimeout(function () {
        message.react(json2[i].info[0]);
      }, time)
      time = time + 500
    }
  })
}
exports.wtf = function(Discord, channel) {
  json3 = role.wtf
  embed = new Discord.RichEmbed()
    .setColor(0x0076c2)
    .setDescription('Réagissez aux langages que vous utilisez !')
    .addField('**WTF**', strEmbedRole(json3))
  channel.send({
    embed
  }).then(function (message) {
    for (let i = 0; i < json3.length; i++) {
      console.log(i)
      setTimeout(function() {
        message.react(json3[i].info[0])
      }, time)
      time = time + 500
    }
  })
}
exports.os = function (Discord, channel) {
  json4 = role.os
  embed = new Discord.RichEmbed()
    .setColor(0x0076c2)
    .setDescription('Réagissez aux OS que vous utilisez !')
    .addField('**OS**', strEmbedRole(json4))
  channel.send({
    embed
  }).then(function (message) {
    for (let i = 0; i < json4.length; i++) {
      console.log(i)
      setTimeout(function() {
        message.react(json4[i].info[0])
      }, time)
      time = time + 500
    }
  })
}

exports.testRole = function (emote) {
  for (var i = 0; i < role.web.length; i++) {
    if (emote === role.web[i].info[0]) {
      return role.web[i].info[2]
    }
  }
  for (var i = 0; i < role.logiciel.length; i++) {
    if (emote === role.logiciel[i].info[0]) {
      return role.logiciel[i].info[2];
    }
  }

  for (var i = 0; i < role.poo.length; i++) {
    if (emote === role.poo[i].info[0]) {
      return role.poo[i].info[2]
    }
  }

  for (var i = 0; i < role.wtf.length; i++) {
    if (emote === role.wtf[i].info[0]) {
      return role.wtf[i].info[2]
    }
  }

  for (var i = 0; i < role.os.length; i++) {
    if (emote === role.os[i].info[0]) {
      return role.os[i].info[2]
    }
  }
  return 'none'
}

function strEmbedRole (list) {
  let strContent = ''
  // console.log(list);
  for (var i = 0; i < list.length; i++) {
    strContent = strContent + list[i].info[1]
    strContent = strContent + role.spe[1]
  }
  return strContent
}
