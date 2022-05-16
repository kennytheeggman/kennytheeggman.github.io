var pictures = [
    {
        "x": 50,
        "y": 100,
        "src": "pictures/background 1.png",
        "caption": "Mr. and Ms. Hamskies move into their new house ... and there's another family member on the way!"
    },
    {
        "x": 350,
        "y": 100,
        "src": "pictures/background 2.png",
        "caption": "David is Santa and Amy is telling him her heart's deepest desires"
    },
    {
        "x": 550,
        "y": 100,
        "src": "pictures/background 3.png",
        "caption": "It's a bird! It's a plane! It's hamskies?"
    },
    {
        "x": 750,
        "y": 100,
        "src": "pictures/background 4.png",
        "caption": "David passes away from old age, leaving Amy devastated :("
    },
    {
        "x": 1250,
        "y": 100,
        "src": "pictures/background 5.png",
        "caption": "domestic hamskies"
    },
    {
        "x": 1550,
        "y": 100,
        "src": "pictures/background 6.png",
        "caption": "hamskies go on one last trip to see the sunset, knowing David doesn't have much time left"
    },
    {
        "x": 1850,
        "y": 100,
        "src": "pictures/background 7.png",
        "caption": "hamskies buff"
    },
    {
        "x": 2150,
        "y": 100,
        "src": "pictures/background 8.png",
        "caption": "Amy is Santa and David is telling her his heart's deepest desires"
    },
    {
        "x": 2450,
        "y": 100,
        "src": "pictures/background 9.png",
        "caption": "hamskies staring into each others eyes for the 1000th time"
    },
    {
        "x": 2750,
        "y": 100,
        "src": "pictures/background 10.png",
        "caption": "what do you got there, david?"
    },
    {
        "x": 3050,
        "y": 100,
        "src": "pictures/background 11.png",
        "caption": "definitely hamskies"
    },
    {
        "x": 3350,
        "y": 100,
        "src": "pictures/background 12.png",
        "caption": "hamskies staring into each others eyes for the 1001st time"
    },
    {
        "x": 3650,
        "y": 100,
        "src": "pictures/background 13.png",
        "caption": "hamskies makes a visit to compsci"
    },
    {
        "x": 3950,
        "y": 100,
        "src": "pictures/background 14.png",
        "caption": "hamskies staring into each others eyes for the 1002nd time"
    },
    {
        "x": 50,
        "y": 700,
        "src": "pictures/background 15.png",
        "caption": "after 3 painfully long years, David finally gives amy a note: \"I love you\""
    },
    {
        "x": 350,
        "y": 700,
        "src": "pictures/background 16.png",
        "caption": "pat pat"
    },
    {
        "x": 650,
        "y": 700,
        "src": "pictures/background 17.png",
        "caption": "pat"
    },
    {
        "x": 950,
        "y": 700,
        "src": "pictures/background 18.png",
        "caption": "I now present: Mr. and Ms. Hamskies! You may now kiss your spouse!"
    },
    {
        "x": 1250,
        "y": 700,
        "src": "pictures/background 19.png",
        "caption": "hamskies staring into each others eyes for the 1003rd time"
    },
    {
        "x": 1550,
        "y": 700,
        "src": "pictures/background 20.png",
        "caption": "squish uwu"
    },
    {
        "x": 1850,
        "y": 700,
        "src": "pictures/background 21.png",
        "caption": "they're thinking of each other"
    },
    {
        "x": 2150,
        "y": 700,
        "src": "pictures/background 22.png",
        "caption": "hamskies ft. [censored]"
    },
    {
        "x": 2450,
        "y": 700,
        "src": "pictures/background 23.png",
        "caption": "is that hamskies in the corner?"
    },
    {
        "x": 2750,
        "y": 700,
        "src": "pictures/background 24.png",
        "caption": "nathan's first ever hamskies photo"
    },
    {
        "x": 3050,
        "y": 700,
        "src": "pictures/background 25.png",
        "caption": "surprise! I couldn't leave without giving my hamsauce a hug"
    },
    {
        "x": 3350,
        "y": 700,
        "src": "pictures/background 26.png",
        "caption": "hamskies about to have their first kiss"
    },
    {
        "x": 3650,
        "y": 700,
        "src": "pictures/background 27.png",
        "caption": "lemme fix your hair"
    },
    {
        "x": 3950,
        "y": 700,
        "src": "pictures/background 28.png",
        "caption": "gotcha!"
    },
    {
        "x": 4250,
        "y": 700,
        "src": "pictures/background 29.png",
        "caption": "always thinking of you"
    }
]

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  
}

const initGui = () => {
    const canvas = document.getElementById("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");

    var dependencies = {
        canvas: canvas,
        ctx: ctx,
        speed: 6,
        player: {
            x: 0,
            y: 0,
            state: 0,
            scale: 0.75,
            inverted: false,
            moving: false
        },
        pictures: pictures,
        sprite: document.getElementById("playersprite"),
        inverse_sprite: document.getElementById("inverseplayersprite"),
        standing_sprite: document.getElementById("playerstanding"),
        inverse_standing_sprite: document.getElementById("inverseplayerstanding"),
        background: document.getElementById("background"),
        keyspressed: [],
        image_scale: 0.2,
        counter: 0
    }

    ctx.moveTo(0, 0);
    ctx.lineTo(100, 100);
    ctx.stroke();
    
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    setInterval(() => {
        update(dependencies);
        move(dependencies.keyspressed, dependencies.player, dependencies);
        dependencies.counter++;
    }, 16);
    document.addEventListener("keydown", (e) => {
        if (e.key == "w") {
            if (!dependencies.keyspressed.includes("w")) {
                dependencies.keyspressed.push("w");
            }
        }
        if (e.key == "a") {
            if (!dependencies.keyspressed.includes("a")) {
                dependencies.keyspressed.push("a");
                dependencies.inverted = true;
            }
        }
        if (e.key == "s") {
            if (!dependencies.keyspressed.includes("s")) {
                dependencies.keyspressed.push("s");
            }
        }
        if (e.key == "d") {
            if (!dependencies.keyspressed.includes("d")) {
                dependencies.keyspressed.push("d");
                dependencies.inverted = false;
            }
        }
    });
    document.addEventListener("keyup", (e) => {
        if (e.key == "w") {
            var index = dependencies.keyspressed.indexOf("w");
            if (index > -1) {
              dependencies.keyspressed.splice(index, 1); // 2nd parameter means remove one item only
            }
            // console.log(dependencies.keyspressed);
        }
        if (e.key == "a") {
            var index = dependencies.keyspressed.indexOf("a");
            if (index > -1) {
              dependencies.keyspressed.splice(index, 1); // 2nd parameter means remove one item only
            }
            // console.log(dependencies.keyspressed);
        }
        if (e.key == "s") {
            var index = dependencies.keyspressed.indexOf("s");
            if (index > -1) {
              dependencies.keyspressed.splice(index, 1); // 2nd parameter means remove one item only
            }
            // console.log(dependencies.keyspressed);
        }
        if (e.key == "d") {
            var index = dependencies.keyspressed.indexOf("d");
            if (index > -1) {
              dependencies.keyspressed.splice(index, 1); // 2nd parameter means remove one item only
            }
            // console.log(dependencies.keyspressed);
        }
    })
};


const move = (pressedkeys, player, dependencies) => {
    dependencies.player.moving = false;
    if (pressedkeys.includes("w")) {
        player.y -= dependencies.speed;
        dependencies.player.moving = true;
    }
    if (pressedkeys.includes("a")) {
        player.x -= dependencies.speed;
        dependencies.player.moving = true;
    }
    if (pressedkeys.includes("s")) {
        player.y += dependencies.speed;
        dependencies.player.moving = true;
    }
    if (pressedkeys.includes("d")) {
        player.x += dependencies.speed;
        dependencies.player.moving = true;
    }
    if (dependencies.player.moving && dependencies.counter % 2 == 0) {
        player.state += 1;
        player.state %= 12;
    }
}

const update = (dependencies) => {
    let canvas = dependencies.canvas;
    let ctx = dependencies.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(dependencies.player, dependencies.pictures, dependencies);
    drawPlayerSprite(dependencies.player, dependencies);
}

const drawPlayerSprite = (player, dependencies) => {
    let ctx = dependencies.ctx;
    if (dependencies.player.moving) {
        if (dependencies.inverted) {
            // Draw the image    
            ctx.drawImage(dependencies.inverse_sprite, 84 * player.state, 0, 84, 128, canvas.width / 2 - 42, canvas.height / 2 - 64, 84 * player.scale, 128 * player.scale);
            
            // console.log(dependencies.inverted);
        }
        else {
            ctx.drawImage(dependencies.sprite, 84 * player.state, 0, 84, 128, canvas.width / 2 - 42, canvas.height / 2 - 64, 84 * player.scale, 128 * player.scale);
        }
    }
    else {
        if (dependencies.inverted) {
            // Draw the image    
            ctx.drawImage(dependencies.inverse_standing_sprite, 32, 0, 84, 128, canvas.width / 2 - 42, canvas.height / 2 - 64, 84 * player.scale * 1.15, 128 * player.scale * 1.15);
            
            // console.log(dependencies.inverted);
        }
        else {
            ctx.drawImage(dependencies.standing_sprite, 32, 0, 84, 128, canvas.width / 2 - 42, canvas.height / 2 - 64, 84 * player.scale * 1.15, 128 * player.scale * 1.15);
        }
    }
}

const drawBackground = (player, pictures, dependencies) => {
    let ctx = dependencies.ctx;
    let canvas = dependencies.canvas;
    var caption = "";
    ctx.fillStyle = "#e06666";
    ctx.fillRect(0, canvas.height / 2 - 50 - player.y, canvas.width, 100);
    for (i of pictures) {
        if (i.x - player.x + 500 > 0 && i.x - player.x < canvas.width) {
            let image = new Image();
            image.src = i.src;
            ctx.beginPath();
            ctx.drawImage(image, i.x - player.x, i.y - player.y, image.width * dependencies.image_scale, image.height * dependencies.image_scale);
            // ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            // roundRect(ctx, 10, 10, 500, 50, 5, true, false);
            // console.log(i.x, i.x + image.width, player.x)
            if (i.x < player.x + canvas.width / 2 - 42 && i.x + image.width * dependencies.image_scale > player.x + canvas.width / 2 - 42 && i.y < player.y + canvas.height / 2 - 64 && i.y + image.height * dependencies.image_scale> player.y + canvas.height / 2 - 64) {
                // console.log(i);
                caption = i.caption;
            }
        }

    }
    
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText(caption, 20, 40);
    ctx.fill();
}


window.onload = initGui;

