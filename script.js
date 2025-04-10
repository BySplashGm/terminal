const container = document.getElementById("console");
const template = document.getElementById("linetemplate");
const commandLine = document.getElementById("write");
const ghost = document.getElementById("ghost");

function keepFocus() {
    commandLine.focus();
}

document.getElementById("body").addEventListener("click", keepFocus);
commandLine.addEventListener("blur", keepFocus);

const commands = {
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
        result: [`<p>Opening a new tab...</p>`]
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
            `<p>Type 'gui' or click <a href="https://maximeval.in">here</a> for a simpler version.</p>`,
            `<p> </p>`,
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
            `<p> .                   OMo           ':ddo.          📜 <a href="https://maximeval.in/about">resume</a><br></p>`,
            `<p>                    dMc               :OO;         🌐 <a href="https://maximeval.in">GUI Portfolio</a><br></p>`,
            `<p>                    0M.                 .:o.       -----------<br></p>`,
            `<p>                    ;Wd                            💌 CONTACT<br></p>`,
            `<p>                     ;XO,                          🟦 <a href="https://linkedin.com/in/maximevalin">linkedin.com/in/maximevalin</a><br></p>`,
            `<p>                       ,d0Odlc;,..                 📫 <a href="mailto:contact@maximeval.in">contact@maximeval.in</a><br></p>`,
            `<p>                           ..',;:cdOOd::,.         🤖 <a href="https://github.com/MaximeValin">github.com/MaximeValin</a><br></p>`,
            `<p>                                    .:d;.':;.      🌐 <a href="https://maximeval.in/contact">https://maximeval.in/contact<br></p>`,
            `<p>                                       'd,  .'     -----------<br></p>`,
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
    },
    "man" : {
        aliases: [],
        description: "an interface to the system reference manuals",
        usage: "man < command_name >",
        result: []
    },
    "clear" : {
        aliases: [],
        description: "clear the terminal screen",
        usage: "clear",
        result: []
    },
    "echo" : {
        aliases: [],
        description: "repeat something",
        usage: "echo < text >",
        result: []
    }
};

const cmdSet = new Set();
for (const [name, cmd] of Object.entries(commands)) {
    cmdSet.add(name);
    cmd.aliases.forEach(alias => cmdSet.add(alias));
}
cmdSet.add("help");

const cmdList = Array.from(cmdSet).sort();

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

let commandHistory = [];
let historyIndex = -1;

commandLine.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            commandLine.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
            commandLine.value = commandHistory[0];
        }
    } else if (e.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandLine.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            commandLine.value = "";
        }
    }
});

commandLine.addEventListener("input", () => {
    const value = commandLine.value.toLowerCase();
    if (value === "") {
        ghost.textContent = "";
        commandLine.classList.remove("invalid");
        return;
    }

    const [first] = value.split(" ");
    const match = cmdList.find(cmd => cmd.startsWith(first));
    if (match) {
        ghost.textContent = match;
        commandLine.classList.remove("invalid");
    } else {
        ghost.textContent = value;
        commandLine.classList.add("invalid");
    }
});

commandLine.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        e.preventDefault();
        const value = commandLine.value.toLowerCase();
        const [first] = commandLine.value.toLowerCase().split(" ");
        const match = cmdList.find(cmd => cmd.startsWith(first));
        
        if (match) {
            commandLine.value = match;
            ghost.textContent = "";
        }
    }
});


function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
        })[m];
    });
}


document.getElementById("writeform").addEventListener("submit", function (e) {
    e.preventDefault();

    const prompt = commandLine.value;
    if (prompt.trim() !== "") {
        commandHistory.push(prompt);
        historyIndex = commandHistory.length;
    }
    commandLine.value = "";
    ghost.textContent = "";
    commandLine.classList.remove("invalid");

    const clone = template.content.cloneNode(true);
    const linecmd = clone.getElementById("linecmd");
    const lineres = clone.getElementById("lineres");

    linecmd.innerHTML = escapeHTML(prompt);

    const promptSplit = prompt.trim().split(/\s+/);
    const cmd = promptSplit[0].toLowerCase();
    const arg = promptSplit[1] ? promptSplit[1].toLowerCase() : null;

    if (cmd === "clear") {
        container.innerHTML = "";
        return;
    }

    if (cmd === "man") {
        if (arg) {
            const matchedCmd = Object.entries(commands).find(([name, details]) =>
                name === arg || details.aliases.includes(arg)
            );
            if (matchedCmd) {
                const [name, details] = matchedCmd;
                lineres.innerHTML += "<p class='bold'>NAME</p>";
                lineres.innerHTML += `<p>${name} - ${details.description}</p>`;
                lineres.innerHTML += `<p class='bold'>ALIAS${details.aliases.length === 1 ? "" : "ES"}</p>`;
                lineres.innerHTML += `<p>${details.aliases.length ? details.aliases.join(", ") : "None"}</p>`;
                lineres.innerHTML += "<p class='bold'>USAGE</p>";
                lineres.innerHTML += `<p>${details.usage}</p>`;
            } else {
                lineres.innerHTML = `[MAN] Unknown command: '${arg}'. Type 'help' to see all available commands.`;
            }
        } else {
            lineres.innerHTML += "<p>What manual page do you want?</p>";
            lineres.innerHTML += "<p>For example, try 'man man'.</p>";
        }

        container.append(clone);
        return;
    }

    if (cmd === "help") {
        const helpCmd = commands["help"];
        helpCmd.result.forEach(r => lineres.innerHTML += r);
        container.append(clone);
        return;
    }

    if (cmd === "echo") {
        const msg = promptSplit.slice(1).join(" ");
        lineres.innerHTML = escapeHTML(msg);
        container.append(clone);
        return;
    }

    // Si commande valide
    if (cmdList.includes(cmd)) {
        const matched = Object.entries(commands).find(([name, details]) =>
            name === cmd || details.aliases.includes(cmd)
        );
        if (matched) {
            matched[1].result.forEach(r => lineres.innerHTML += r);
        }
    } else if (cmd !== "") {
        lineres.innerHTML = `Unknown command: '${cmd}'. Type 'help' to see all available commands.`;
    }

    container.append(clone);
    container.scrollTop = container.scrollHeight;
});
