require('dotenv').config();
console.log(process.env.DISCORDJS_BOT_TOKEN);

const { Client, DiscordAPIError, APIMessage, Message, Channel } = require('discord.js')

const client = new Client()



client.login(process.env.DISCORDJS_BOT_TOKEN)

var list = ["zdrapka GOLD", "przepustka do state-rp", "forum IPS (nielegalne)", "głowa bartosza misiaka", 
"Premium do state-rp (na zawsze)", "vibrator", "Deagle (nielegalny)", "iPhone13", "niekaralność+", 'zółty krawat WiP', 
'kostka', 'nokia', 'sałata', 'wędka z lss', 'sznur :)']

var bombTimer = 5;


client.on('message', msg=>{
    var parts = msg.content.split(' ');
  
 
    if(msg.content=="/p")
    {
        var itemsMsg = "przedmioty należące do Ciebie:\n\n";
        var lastNum = 0;
        for(var i=0; i<3; i++)
        {
            var newNum = getRandom(list.length);
            if(newNum == lastNum )
                newNum = getRandom(list.length);
            itemsMsg+=list[newNum]
            if(i+1 != 3)
            {   itemsMsg+= ","

            }
            itemsMsg+="\n"
            lastNum = newNum;
        }
        msg.reply( itemsMsg )
    }
    else if(parts[0] == "/smiercpostaci")
    {
        var message = "* <@"+msg.member.id+"> umiera. Wszystkie przedmioty należące do tej postaci pozostały na ziemi";
        msg.channel.send(message);
        msg.delete()
    }
    else if(msg.content == "/p kostka")
    {
        var num = getRandom(6)
        if(num == 0)
             num++
        var message = "* <@"+msg.member.id+"> wyrzuca "+num+" na 6 oczek używając Kostka.";
        msg.channel.send(message);
        msg.delete()
    }
    else if(parts[0] == "/pay")
    {
        if(parts.length >= 2)
        {
            var money = parts[2]
            if(isNaN(money)){
                return;
            }
            if(!money)
            {
                return;
            }
            if(money >= 100000){
                var message = `* <@"+${msg.member.id}+"> nie za dużo tych pieniędzy masz? Nie ma mowy.`
                msg.channel.send(message);
                msg.delete()
                return;
            }
            var user = parts[1]

            var message = `* <@${msg.member.id}> przekazuje $${money} dla ${user}`
            msg.channel.send(message);
            msg.delete()
        }
        else
        {
            var message = "** <@"+msg.member.id+"> nie stwierdził(a) komu i ile pieniędzy chce przekazać..."
            msg.channel.send(message);
            msg.delete()
        }
      
    }
    else if(msg.content === "/p podnies")
    {
        if(lastItem == null)
        {
            var message = "** <@"+msg.member.id+"> nie znalazł(a) niczego co znajduje się na ziemi.";
            msg.channel.send(message);
            msg.delete()
            return;
        }
        var message = "** <@"+msg.member.id+"> podnosi przedmiot "+lastItem+".";
        msg.channel.send(message);
        msg.delete()
        if(lastItem == "Bomba")
        {
            message =  `** <@${msg.member.id}> aktywował bombę która wystrzeli za: ${bombTimer}`;
            msg.channel.send(message).then( (sentMsg)=>{
                var timeout = setTimeout( ()=>
                {
                    label:
                    sentMsg.edit( `** <@${msg.member.id}> aktywował bombę która wystrzeli za: ${bombTimer}`);
                    bombTimer--;
                    if(bombTimer == 0)
                    {
                        msg.member.kick("Bomba!");
                        bombTimer = 5;
                    }
                    else this;
                }, 1000);
                clearTimeout(timeout);
            })
        }
        lastItem = null;
        
    }
    else if(msg.content === "pseudol")
    {
        var num = getRandom(6)
        var message = "** <@"+msg.member.id+"> pseudole to masz na mta i skryptach ms'ki ";
        msg.channel.send(message);
        msg.delete()
    }
    else if(parts[0] == "/b")
    {
        var action = getMessageFromParts(1, parts)
        var  message = "(( <@"+msg.member.id+">: " + action + " ))"
        msg.channel.send(message);
        msg.delete()
    }
    else if(parts[0] === "/p")
    {
        if(parts.length >= 1)
        {
            if(parts[1] == "odloz")
            {
                var itemName = null 
                
                if(parts.length >= 1)
                {
                    
                    var  message = "** <@"+msg.member.id+"> odkłada jakiś przedmiot na ziemie."
                    msg.channel.send(message);
                    msg.delete()
                    var itemName = getMessageFromParts(2, parts)
                    if(itemName == "Bomba")
                    {
                        if(bombTimer != 5)
                        {
                            bombTimer = 5;
                            message = "** <@"+msg.member.id+"> dezaktywuje i tym samym resetuje tykającą bombę!"
                            msg.channel.send(message);
                        }
                       
                    }
                    lastItem = itemName;
                }
                else
                {
                    var message = "** <@"+msg.member.id+"> próbował(a) odłożyć przedmiot nie podając jego nazwy..."
                    msg.channel.send(message);
                    msg.delete()
                }
            }
        }
    }
    else if(parts[0] === "/conowego")
    {
        var message = "<@"+msg.member.id+">, o to nowe funkcjonalmości specjalnie dla cb:\n\
        nowość:\n\
        - komendy: /b, /smiercpostaci, //pa\n\
        - bug fix: /sprobuj zawsze wypadało na 'nie udało się'\n\
        - bug fix: /pay sprawdza ilość gotówki\n\
        \n\n\
        update 3\n\
        - logi serwerowe\n\
        - komenda: //me\n\n\
        poprzednie zmiany:\n\
            update 2\n\
        - /me już działa\n\
        - nowa komenda /pseudol\n\n\
            update 1\n\
        - nowe komendy: /me, /do, /sprobuj, /report, /conowego, /pay\n\
        - po podniesieniu przedmiotu już nic nie zostaje na ziemi"
        msg.channel.send(message);
    }
    else if(parts[0] == "//pa")
    {
        var  message = "https://tenor.com/view/penguin-hello-hi-hey-there-cutie-gif-3950966"
        msg.channel.send(message);
    }
    else if(parts[0] == "//me")
    {
        var action = getMessageFromParts(1, parts)
        var  message = "** <@"+msg.member.id+"> " + action
        msg.channel.send(message);
        msg.delete()
    }
    else if(parts[0] == "/do")
    {
        var action = getMessageFromParts(1, parts)
        var  message = "** "+action+ " (( <@"+msg.member.id+"> ))"
        msg.channel.send(message);
        msg.delete()
    }
    else if(parts[0] == "/sprobuj")
    {
        var action = getMessageFromParts(1, parts)
        var random = getRandom(2)
        var  message = ""
        if(random)
        message =  "* <@"+msg.member.id+">"+" odniósł sukces próbując " + action
        else
        message =  "* <@"+msg.member.id+">"+" zawiódł próbując " + action
        msg.channel.send(message);
        msg.delete()
    }
    else if(parts[0] == "/report")
    {
        var  message = "Raport na gracza został wysłany."
        msg.channel.send(message);
    }

    if(msg.channel.id != "756219899176812545")
    {
        if(msg.member.id == client.user.id)
        return;
        let logsChannel = client.channels.cache.get("756219899176812545")
        

        for(var item of msg.member.roles.cache.array())
        {
            if(item.name == "Administrator" || item == "Moderator")
            {
                logsChannel.send(`${msg.channel.toString()} > ${msg.member.displayName}: ${msg.content}`.replace(`<@${msg.member.id}>`, `${msg.member.displayName}`))
                return
            }

            
        }
        msg.member.
        logsChannel.send(`${msg.channel.toString()} > <@${msg.member.id}>: ${msg.content}`)
    }
    
   
})


function getRandom(max)
{
    return Math.floor( Math.random()*Math.floor(max) );
}

function getMessageFromParts(startIndex, parts)
{
    var message = ""
    for(var i=startIndex; i<parts.length; i++)
    {
        message += parts[i]
        if (i+1 != parts.length)
            message+=" "
        
    }

    return message
}
