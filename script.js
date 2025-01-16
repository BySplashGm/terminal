const container = document.getElementById("console");
const template = document.getElementById("linetemplate");
const commandLine = document.getElementById('write');

function keepFocus() {
    commandLine.focus();
}

document.getElementById('body').addEventListener('click', keepFocus);

commandLine.addEventListener('blur', keepFocus);

commands = {
    "sudo": {
        aliases: [],
        description: "use super user powers",
        usage: "sudo < command >",
        result: [`<p>please do not use that.. you might break something.</p>`]
    },
    "gui": {
        aliases: ["portfolio", "website"],
        description: "get to the Graphical User Interface version",
        usage: "gui",
        result: [`<p>The gui version of my portfolio is still under construction...</p>`]
    },
    "cd": {
        aliases: [],
        description: "change the working directory",
        usage: "cd [directory]",
        result: [`<p>you might not be able to do this...</p>`]
    },
    "pwd": {
        aliases: [],
        description: "return working directory name",
        usage: "pwd",
        result: [`<p>/home/guest</p>`]
    },
    "nano": {
        aliases: [],
        description: "Nano's ANOther editor, an enhanced free Pico clone",
        usage: "nano",
        result: [`<p>we're in 2024. you should use 'vi'.</p>`]
    },
    "vi": {
        aliases: [],
        description: "screen-oriented (visual) display editor",
        usage: "vi",
        result: [`<p>do you really use 'vi' instead of 'vim'?</p>`]
    },
    "vim": {
        aliases: [],
        description: "Vi IMproved",
        usage: "vim",
        result: [`<p>'vim' is so old. you definitely need to try 'nvim'.</p>`]
    },
    "nvim": {
        aliases: [],
        description: "edit text",
        usage: "nvim",
        result: [`<p>please, just download vscode.</p>`]
    },
    "whoami": {
        aliases: [],
        description: "print effective user name",
        usage: "whoami",
        result: [`<p>guest</p>`]
    },
    "ls": {
        aliases: [],
        description: "list directory contents",
        usage: "ls",
        result: [
            `<p class="teal bold">Desktop    Downloads  Videos</p>`,
            `<p class="teal bold">Documents  Music</p>`,
        ]
    },
    "welcome": {
        aliases: ["banner"],
        description: "to my terminal portfolio",
        usage: "welcome",
        result: [
            `<p class="yellow">███╗   ███╗ █████╗ ██╗  ██╗██╗███╗   ███╗███████╗</p>`,
            `<p class="yellow">████╗ ████║██╔══██╗╚██╗██╔╝██║████╗ ████║██╔════╝</p>`,
            `<p class="yellow">██╔████╔██║███████║ ╚███╔╝ ██║██╔████╔██║█████╗  </p>`,
            `<p class="yellow">██║╚██╔╝██║██╔══██║ ██╔██╗ ██║██║╚██╔╝██║██╔══╝  </p>`,
            `<p class="yellow">██║ ╚═╝ ██║██║  ██║██╔╝ ██╗██║██║ ╚═╝ ██║███████╗</p>`,
            `<p class="yellow">╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝</p>`,
            `<p> </p>`,
            `<p>Type 'help' to see the list of available commands.</p>`,
            `<p>Type 'sumfetch' to display summary.</p>`,
            `<p>Type 'gui' or click <a>here</a> for a simpler version.</p>`,
            `<p> </p>`,
            `<p>⚠️ This project is not finished. You might encounter some errors or miss some features.</p>`,
        ]
    },
    "sumfetch": {
        aliases: ["summary", "neofetch", "sum"],
        description: "a summary",
        usage: "sumfetch",
        result: [
            `<p>..............<br></p>`,
            `<p>            ..,;:ccc,.<br></p>`,
            `<p>          ......''';lxO.                           📋 sumfetch: summary display<br></p>`,
            `<p>.....''''..........,:ld;                           -----------<br></p>`,
            `<p>           .';;;:::;,,.x,                          ❓ ABOUT<br></p>`,
            `<p>      ..'''.            0Xxoc:,.  ...              🪪 Maxime Valin<br></p>`,
            `<p>  ....                ,ONkc;,;cokOdc',.            💻 Computer Science Student<br></p>`,
            `<p> .                   OMo           ':ddo.          📜 <a href="#">resume</a><br></p>`,
            `<p>                    dMc               :OO;         🌐 //TODO<br></p>`,
            `<p>                    0M.                 .:o.       -----------<br></p>`,
            `<p>                    ;Wd                            💌 CONTACT<br></p>`,
            `<p>                     ;XO,                          🟦 <a href="https://linkedin.com/in/maximevalin">linkedin.com/in/maximevalin</a><br></p>`,
            `<p>                       ,d0Odlc;,..                 📫 <a href="mailto:contact@maximeval.in">contact@maximeval.in</a><br></p>`,
            `<p>                           ..',;:cdOOd::,.         🤖 <a href="https://github.com/MaximeValin">github.com/MaximeValin</a><br></p>`,
            `<p>                                    .:d;.':;.      -----------<br></p>`,
            `<p>                                       'd,  .'     //TODO<br></p>`,
            `<p>                                         ;l   ..   <br></p>`,
            `<p>                                          .o       <br></p>`,
            `<p>                                            c<br></p>`,
            `<p>                                            .'<br></p>`,
            `<p>                                             .</p>`,
        ]
    },
    "projects": {
        aliases: ["mywork"],
        description: "what i've made by this day",
        usage: "projects",
        result: [
            `<p>The list is under creation... Be patient :)</p>`
        ]
    }
};

cmdList = [];
for (const [key, value] of Object.entries(commands)) {
    cmdList.push(key);
    for (i = 0; i < value["aliases"].length; i++) {
        cmdList.push(value["aliases"][i]);
    }
}
cmdList.push("clear", "help", "man");
cmdList.sort();

cmdListString = "";

for (i = 0; i < cmdList.length; i++) {
    if (i != 0 && i % 8 == 0) {
        cmdListString += "<br>";
    }
    cmdListString += cmdList[i] + " "
}

commands["help"] = {
    aliases: [],
    description: "Display information about builtin commands",
    usage: "help",
    result : [
        `<p>Here are all the available commands:</p>`,
        `<p> </p>`,
        "<p>" + cmdListString + "</p>",
        `<p> </p>`,
        `<p>Use the 'man' command to get information about a specific command.</p>`,
    ]
}

commands["man"] = {
    aliases: [],
    description: "an interface to the system reference manuals",
    usage: "man < command_name >",
    result: []
}

commands["clear"] = {
    aliases: [],
    description: "clear the terminal screen",
    usage: "clear",
    result: []
}

document.getElementById("writeform").addEventListener("submit", function (e) {
    e.preventDefault();

    var prompt = document.getElementById('write').value;
    document.getElementById('write').value = "";
    const clone = template.content.cloneNode(true);

    
    let linecmd = clone.getElementById("linecmd");
    linecmd.innerHTML = prompt;
    let lineres = clone.getElementById("lineres");

    promptSplit = prompt.split(' ');

    cmd = promptSplit[0].toLowerCase();

    if (cmd == "clear") {
        container.innerHTML = '';
    } else if (cmd == "man") {

        if (promptSplit[1]) {
            arg = promptSplit[1].toLowerCase();
            if (cmdList.includes(arg)) {
                for (const [name, details] of Object.entries(commands)) {
                    if (name == arg || details["aliases"].includes(arg)) {
                        
                        lineres.innerHTML += "<p class='bold'>NAME</p>";
                        lineres.innerHTML += "<p>" + arg + " - " + details["description"] + "</p>";
                        lineres.innerHTML += "<p class='bold'>ALIAS" + (details["aliases"].length == 1 ? "" : "ES") + "</p>";
                        lineres.innerHTML += "<p>" + (details["aliases"].length != 0 ? details["aliases"] : "None") + "</p>";
                        lineres.innerHTML += "<p class='bold'>USAGE</p>";
                        lineres.innerHTML += "<p>" + details["usage"] + "</p>";
    
                    }
                }
            } else {
                lineres.innerHTML = "[MAN] Unknown command: '" + cmd + "' Type 'help' to see all available commands.";
            }
            
        } else {
            lineres.innerHTML += "<p>What manual page do you want?</p>";
            lineres.innerHTML += "<p>For example, try 'man man'.</p>";
        }
        
        container.append(clone);

    } else {
        if (cmdList.includes(cmd)) {
            for (const [name, details] of Object.entries(commands)) {
                if (name == cmd || details["aliases"].includes(cmd)) {
                    for (i = 0; i < details["result"].length; i++) {
                        lineres.innerHTML += details["result"][i];
                    }
                }
            }
        } else if (cmd != "") {
            lineres.innerHTML = "Unknown command: '" + cmd + "'. Type 'help' to see all available commands.";
        }
        container.append(clone);
    }
});