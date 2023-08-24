///// SKULL ISLAND GAME /////

// CHARACTER POSITIONS //
var gameChar_x;
var gameChar_y;

// CHARACTER MOVEMENTS //
var isLeft;
var isRight;
var isFalling;
var isPlummeting = false;

var floorPos_y;

var cameraPosX;

// OBJECTS //
var canyons;
var cloudsMove;
var skulls;
var flagpole;
var dFlag;

// GAME FUNCTIONS //
var gameOver = false;
var levelComplete = false;
var gameScore;

// SOUND AND FONTS //
var myFont;
var BGsound;
var BGsoundON = true;
var skullSound;
var scream;

function preload() {

    // textfont // changes the default font to a custom font //
    myFont = loadFont('Swamp Witch.ttf');

    //SOUNDS// load all sounds used in the game //
    soundFormats('mp3', 'wav');
    BGsound = loadSound('atmosphere.wav');
    BGsound.setVolume(0.2);
    skullSound = loadSound('crashbones.wav');
    skullSound.setVolume(0.2);
    scream = loadSound('scream.wav');
    scream.setVolume(0.2);
}

function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    // CHARACTER  VARIABLES CONTROLS //
    isLeft = false;
    isRight = false;
    isFalling = false;

    cameraPosX = 0;
    cloudsMove = 0;
    gameScore = 0;

    //BRICK WALLS POSITION //
    walls_x = [0];
    walls_y = floorPos_y;

    /// COLLECTABLE (SKULLS) ARRAY //
    skulls = [{
            x_pos: 900,
            y_pos: 350,
            isFound: false
        },
        {
            x_pos: 1200,
            y_pos: 320,
            isFound: false
        },
        {
            x_pos: 1200,
            y_pos: 270,
            isFound: false
        },
        {
            x_pos: 1490,
            y_pos: 270,
            isFound: false
        },
        {
            x_pos: 1700,
            y_pos: 350,
            isFound: false
        },
        {
            x_pos: 2350,
            y_pos: 350,
            isFound: false
        },
        {
            x_pos: 1900,
            y_pos: 350,
            isFound: false
        },
        {
            x_pos: 2000,
            y_pos: 350,
            isFound: false
        },
        {
            x_pos: 2350,
            y_pos: 300,
            isFound: false
        },
        {
            x_pos: 2900,
            y_pos: 200,
            isFound: false
        },
        {
            x_pos: 2900,
            y_pos: 300,
            isFound: false
        },
        {
            x_pos: 3200,
            y_pos: 300,
            isFound: false
        },
        {
            x_pos: 3400,
            y_pos: 300,
            isFound: false
        }]

    /// FLAGPOLE OBJECT //
    flagpole = {
        pos_x: 3800,
        pos_y: floorPos_y,
        flag_pos_x: 3800,
        flag_pos_y: floorPos_y,
        isReached: false
    }

    /// CANYONS ARRAY //
    canyons = [{
            x_pos: -200,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: -100,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: 900,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: 1300,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: 1500,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: 1900,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: 2800,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: 3000,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: 3200,
            y_pos: floorPos_y,
            width: 150
        }];
}

function draw() {

    //// SKY ////
    background(60, 60, 60);

    //// FLOOR ////
    noStroke();
    fill(18, 18, 18);
    rect(0, floorPos_y, width, height - floorPos_y);

    // BEGINING OF CAMERA //
    push();
    translate(-cameraPosX, 0);

    //BLOOD MOON DRAWING //
    push();
    drawingContext.shadowBlur = 350;
    drawingContext.shadowColor = "red";
    fill(130, 43, 43, 150);
    ellipse(1250, 140, 270);
    pop();

    ////CANYONS LOOP////
    for (var i = 0; i < canyons.length; i++) {
        noStroke();
        fill(60, 60, 60);
        rect(canyons[i].x_pos,
            canyons[i].y_pos,
            canyons[i].width,
            height - floorPos_y);

        push();
        // floor lava drawing //   
        drawingContext.shadowBlur = 700;
        drawingContext.shadowColor = "red";
        fill(255, 0, 0, 50);
        rect(canyons[i].x_pos,
            canyons[i].y_pos + 110,
            canyons[i].width,
            40);
        pop();

        // canyon statment that makes the character falls when on top of the canyon//
        if (gameChar_x < canyons[i].x_pos + 150 &&
            gameChar_x > canyons[i].x_pos + 10 &&
            gameChar_y >= floorPos_y) {
            isPlummeting = true;
        }
    }

    //// CLOUDS ARRAY////
    clouds = [
        {
            x_pos: -180,
            y_pos: 80
        },
        {
            x_pos: -780,
            y_pos: 80
        },
        {
            x_pos: -950,
            y_pos: 120
        },
        {
            x_pos: -1500,
            y_pos: 80
        },
        {
            x_pos: -2000,
            y_pos: 120
        },
        {
            x_pos: -2200,
            y_pos: 80
        },
        {
            x_pos: -2900,
            y_pos: 80
        },
        {
            x_pos: -3200,
            y_pos: 120
        },
        {
            x_pos: 180,
            y_pos: 80
        },
        {
            x_pos: 780,
            y_pos: 80
        },
        {
            x_pos: 950,
            y_pos: 120
        },
        {
            x_pos: 1500,
            y_pos: 80
        },
        {
            x_pos: 2000,
            y_pos: 120
        },
        {
            x_pos: 2200,
            y_pos: 80
        },
        {
            x_pos: 2900,
            y_pos: 80
        },
        {
            x_pos: 3200,
            y_pos: 120
        },
    ]

    for (var i = 0; i < clouds.length; i++) {
        push();
        noStroke();
        fill(80, 80, 80);
        ellipse(clouds[i].x_pos + cloudsMove,
            clouds[i].y_pos,
            217,
            35);

        ellipse(clouds[i].x_pos + cloudsMove,
            clouds[i].y_pos - 15,
            100,
            25);

        ellipse(clouds[i].x_pos + cloudsMove + 20,
            clouds[i].y_pos + 12,
            100,
            25);

        // This makes the clouds move across the background //
        cloudsMove += 0.1;
        pop();
    }

    //// MOUNTAINS ARRAY ////

    mountains = [
        {
            x_pos: 150,
            y_pos: 432
        },
        {
            x_pos: 2200,
            y_pos: 432
        },
        {
            x_pos: 3800,
            y_pos: 432
        }
    ]

    /// MOUNTAINS DRAWING AND LOOP///
    for (var i = 0; i < mountains.length; i++) {
        push();

        //mountain smokes
        fill(90, 90, 90, 100);
        ellipse(mountains[i].x_pos + 360,
            mountains[i].y_pos - 390,
            10,
            10);

        ellipse(mountains[i].x_pos + 345,
            mountains[i].y_pos - 380,
            15,
            15);

        ellipse(mountains[i].x_pos + 330,
            mountains[i].y_pos - 360,
            20,
            20);

        ellipse(mountains[i].x_pos + 330,
            mountains[i].y_pos - 330,
            30,
            30);

        ellipse(mountains[i].x_pos + 310,
            mountains[i].y_pos - 300,
            40,
            40);

        ellipse(mountains[i].x_pos + 310,
            mountains[i].y_pos - 270,
            50,
            50);

        // mountain shape drawing
        fill(40, 40, 40);
        beginShape();
        vertex(mountains[i].x_pos + 80,
            mountains[i].y_pos);

        vertex(mountains[i].x_pos + 250,
            mountains[i].y_pos - 350)

        vertex(mountains[i].x_pos + 300,
            mountains[i].y_pos - 250)

        vertex(mountains[i].x_pos + 400,
            mountains[i].y_pos - 350)

        vertex(mountains[i].x_pos + 500,
            mountains[i].y_pos);
        endShape();

        // mountain lava 
        stroke(128, 128, 128);
        strokeWeight(3);

        line(mountains[i].x_pos + 300,
            mountains[i].y_pos - 250,
            mountains[i].x_pos + 280,
            mountains[i].y_pos - 230)

        line(mountains[i].x_pos + 280,
            mountains[i].y_pos - 230,
            mountains[i].x_pos + 280,
            mountains[i].y_pos - 100)

        line(mountains[i].x_pos + 280,
            mountains[i].y_pos - 210,
            mountains[i].x_pos + 330,
            mountains[i].y_pos - 150)

        line(mountains[i].x_pos + 280,
            mountains[i].y_pos - 180,
            mountains[i].x_pos + 250,
            mountains[i].y_pos - 170)

        line(mountains[i].x_pos + 250,
            mountains[i].y_pos - 170,
            mountains[i].x_pos + 230,
            mountains[i].y_pos - 130)

        pop();
    }

    //// BRICK WALLS DRAWING AND LOOP ////

    for (var i = 0; i < walls_x.length; i++) {

        fill(50, 50, 50);
        stroke(130, 43, 43);
        strokeWeight(2);

        //1st wall 
        rect(walls_x[i] - 200,
            walls_y - 100,
            100,
            25);

        //2nd wall
        rect(walls_x[i] + 100,
            walls_y - 95,
            100,
            25);

        //3rd wall
        rect(walls_x[i] + 150,
            walls_y - 55,
            100,
            25);

        //4th
        rect(walls_x[i] + 950,
            walls_y - 105,
            100,
            25);

        //5th
        rect(walls_x[i] + 900,
            walls_y - 65,
            100,
            25);

        //6th
        rect(walls_x[i] + 1100,
            walls_y - 75,
            100,
            25);

        //7th
        rect(walls_x[i] + 1300,
            walls_y - 170,
            100,
            25);

        //8th
        rect(walls_x[i] + 1500,
            walls_y - 80,
            100,
            25);

        //9th
        rect(walls_x[i] + 1550,
            walls_y - 110,
            100,
            25);


        //10th
        rect(walls_x[i] + 1900,
            walls_y - 90,
            100,
            25);


        //11th
        rect(walls_x[i] + 2200,
            walls_y - 110,
            100,
            25);

        //12th
        rect(walls_x[i] + 2250,
            walls_y - 80,
            100,
            25);

        //13th
        rect(walls_x[i] + 2950,
            walls_y - 150,
            100,
            25);

        //14th
        rect(walls_x[i] + 2900,
            walls_y - 110,
            100,
            25);
    }

    //// SKULLS  DRAWING AND LOOP (COLLECTABLE OBJECT) ////

    for (var i = 0; i < skulls.length; i++) {

        /// skull statment. Collect the skulls ///
        if (!skulls[i].isFound) {

            //skulls drawing
            noStroke();
            fill(255);

            //head
            ellipse(skulls[i].x_pos,
                skulls[i].y_pos,
                40,
                30);

            //eyes 
            fill(0);
            ellipse(skulls[i].x_pos - 11,
                skulls[i].y_pos,
                9);
            ellipse(skulls[i].x_pos + 11,
                skulls[i].y_pos,
                9);
            fill(255);

            //teeth
            ellipse(skulls[i].x_pos + 8,
                skulls[i].y_pos + 13,
                6,
                12);

            ellipse(skulls[i].x_pos,
                skulls[i].y_pos + 13,
                6,
                12);

            ellipse(skulls[i].x_pos - 8,
                skulls[i].y_pos + 13,
                6,
                12);

            //nose
            fill(0);
            ellipse(skulls[i].x_pos,
                skulls[i].y_pos + 5,
                5);

            // skulls distance to game character
            dSkulls = dist(skulls[i].x_pos,
                skulls[i].y_pos + 82,
                gameChar_x,
                gameChar_y);

            // skulls statment. Increase game score //
            if (dSkulls < 50) {
                skulls[i].isFound = true;
                gameScore += 1;
                skullSound.play();
            }
        }

        //// FLAGPOLE DRAWING AND CONDITIONAL/////  
        dFlag = dist(flagpole.pos_x,
            flagpole.pos_y,
            gameChar_x,
            gameChar_y);

        /// flag statment. Finds the flag ///
        if (!flagpole.isReached) {

            // flagpole drawing
            //bar
            push();
            stroke(0);
            strokeWeight(2.5);
            line(flagpole.pos_x,
                flagpole.pos_y,
                flagpole.pos_x,
                flagpole.pos_y - 300);

            // top of the pole
            fill(0);
            ellipse(flagpole.pos_x,
                flagpole.pos_y - 300,
                12,
                12);

            //flag
            noStroke();
            fill(255, 0, 0);
            triangle(flagpole.pos_x,
                flagpole.pos_y - 80,
                flagpole.pos_x + 70,
                flagpole.pos_y - 35,
                flagpole.pos_x,
                flagpole.pos_y);
            pop();

            //flag sign
            push();
            fill(0);
            textSize(80);
            textFont(myFont);
            text("*", flagpole.pos_x + 9, flagpole.pos_y + 5);
            pop();

        } else {

            //flagpole drawing
            //bar
            push();
            stroke(0);
            strokeWeight(2.5);
            line(flagpole.pos_x,
                flagpole.pos_y,
                flagpole.pos_x,
                flagpole.pos_y - 300);

            // top
            fill(0);
            ellipse(flagpole.pos_x,
                flagpole.pos_y - 300,
                12,
                12);

            //flag
            noStroke();
            fill(255, 0, 0);
            triangle(flagpole.pos_x,
                flagpole.pos_y - 280,
                flagpole.pos_x + 70,
                flagpole.pos_y - 235,
                flagpole.pos_x,
                flagpole.pos_y - 200);
            pop();

            //flag sign
            push();
            fill(0);
            textSize(80);
            textFont(myFont);
            text("*", flagpole.pos_x + 9, flagpole.pos_y - 190);
            pop();
        }

    }
    //// CHARACTER DRAWING ////

    if (isLeft && isFalling) {

        //body
        push();
        noStroke();
        fill(255);

        ellipse(gameChar_x,
            gameChar_y - 30,
            70);

        //head
        ellipse(gameChar_x - 10,
            gameChar_y - 60,
            60);
        pop();

        //chain        
        push();
        fill(255, 0, 0);
        ellipse(gameChar_x - 20, gameChar_y - 22, 20, 20);
        pop();

        // chain symbol
        push();
        fill(0);
        textSize(35);
        text("*", gameChar_x - 27, gameChar_y - 2)
        pop();

        //mouth        
        push();
        fill(0);
        stroke(0);
        rect(gameChar_x - 35,
            gameChar_y - 50,
            15,
            3);
        pop();

        //right eye 
        push();
        noStroke();
        fill(247, 211, 186);
        ellipse(gameChar_x - 30,
            gameChar_y - 70,
            15,
            17);

        fill(255, 0, 0);
        ellipse(gameChar_x - 30,
            gameChar_y - 70,
            5,
            5);
        pop();

    } else if (isRight && isFalling) {

        //body
        push();
        noStroke();
        fill(255);

        ellipse(gameChar_x,
            gameChar_y - 30,
            70);

        //head
        ellipse(gameChar_x + 10,
            gameChar_y - 60,
            60);
        pop();

        //chain        
        push();
        fill(255, 0, 0);
        ellipse(gameChar_x + 20, gameChar_y - 22, 20, 20);
        pop();

        //chain symbol
        push();
        fill(0);
        textSize(35);
        text("*", gameChar_x + 13, gameChar_y - 2)
        pop();

        //left eye
        push();
        noStroke();
        fill(0);
        ellipse(gameChar_x + 25,
            gameChar_y - 70,
            17,
            17);
        pop();

        //mouth        
        push();
        fill(0);
        stroke(0);
        rect(gameChar_x + 20,
            gameChar_y - 50,
            15,
            3);
        pop();

        //eye patch
        push();
        stroke(0);
        strokeWeight(2);
        line(gameChar_x - 17, gameChar_y - 75, gameChar_x + 32, gameChar_y - 79);
        pop();

    } else if (isLeft) {

        //body
        push();
        noStroke();
        fill(255);

        ellipse(gameChar_x,
            gameChar_y - 30,
            70);

        //head
        ellipse(gameChar_x - 10,
            gameChar_y - 60,
            60);
        pop();

        //chain        
        push();
        fill(255, 0, 0);
        ellipse(gameChar_x - 20, gameChar_y - 22, 20, 20);
        pop();

        //chain symbol
        push();
        fill(0);
        textSize(35);
        text("*", gameChar_x - 27, gameChar_y - 2)
        pop();

        //mouth        
        push();
        fill(0);
        stroke(0);
        rect(gameChar_x - 35,
            gameChar_y - 50,
            15,
            3);
        pop();

        //right eye 
        push();
        noStroke();
        fill(247, 211, 186);
        ellipse(gameChar_x - 30,
            gameChar_y - 70,
            15,
            17);

        fill(255, 0, 0);
        ellipse(gameChar_x - 30,
            gameChar_y - 70,
            5,
            5);
        pop();

    } else if (isRight) {

        //body
        push();
        noStroke();
        fill(255);

        ellipse(gameChar_x,
            gameChar_y - 30,
            70);

        //head
        ellipse(gameChar_x + 10,
            gameChar_y - 60,
            60);
        pop();

        //chain        
        push();
        fill(255, 0, 0);
        ellipse(gameChar_x + 20, gameChar_y - 22, 20, 20);
        pop();

        //chain symbol
        push();
        fill(0);
        textSize(35);
        text("*", gameChar_x + 13, gameChar_y - 2)
        pop();

        //left eye
        push();
        noStroke();
        fill(0);
        ellipse(gameChar_x + 25,
            gameChar_y - 70,
            17,
            17);
        pop();

        //mouth        
        push();
        fill(0);
        stroke(0);
        rect(gameChar_x + 20,
            gameChar_y - 50,
            15,
            3);
        pop();

        //eye patch
        push();
        stroke(0);
        strokeWeight(2);
        line(gameChar_x - 17, gameChar_y - 75, gameChar_x + 32, gameChar_y - 79);
        pop();

    } else if (isFalling) {

        //body
        push();
        noStroke();
        fill(255);

        ellipse(gameChar_x,
            gameChar_y - 30,
            70);

        //head
        ellipse(gameChar_x,
            gameChar_y - 60,
            60);
        pop();

        //chain        
        push();
        fill(255, 0, 0);
        ellipse(gameChar_x, gameChar_y - 22, 20, 20);
        pop();

        //chain symbol
        push();
        fill(0);
        textSize(35);
        text("*", gameChar_x - 7, gameChar_y - 2)
        pop();

        //left eye
        push();
        noStroke();
        fill(0);
        ellipse(gameChar_x - 10,
            gameChar_y - 70,
            17,
            17);
        pop();

        //mouth        
        push();
        fill(0);
        stroke(0);
        rect(gameChar_x - 10,
            gameChar_y - 50,
            21,
            3);

        //right eye
        rect(gameChar_x + 7,
            gameChar_y - 70,
            10,
            3);
        pop();

        //eye patch
        push();
        stroke(0);
        strokeWeight(2);
        line(gameChar_x - 25, gameChar_y - 75, gameChar_x + 22, gameChar_y - 79);
        pop();

    } else {

        //body
        push();
        noStroke();
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 30,
            70);

        //head
        ellipse(gameChar_x,
            gameChar_y - 60,
            60);

        pop();

        //chain        
        push();
        fill(255, 0, 0);
        ellipse(gameChar_x, gameChar_y - 22, 20, 20);
        pop();

        //chain symbol
        push();
        fill(0);
        textSize(35);
        text("*", gameChar_x - 6, gameChar_y - 2)
        pop();

        //right eye 
        push();
        noStroke();
        fill(247, 211, 186);
        ellipse(gameChar_x + 10,
            gameChar_y - 70,
            15,
            17);

        fill(255, 0, 0);
        ellipse(gameChar_x + 10,
            gameChar_y - 70,
            5,
            5);
        pop();

        //left eye
        push();
        noStroke();
        fill(0)
        ellipse(gameChar_x - 10,
            gameChar_y - 70,
            17,
            17);
        pop();

        //mouth        
        push();
        fill(0);
        stroke(0);
        rect(gameChar_x - 10,
            gameChar_y - 55,
            21,
            8);
        pop();

        //teeth up
        push();
        noStroke();
        fill(255);
        rect(gameChar_x - 9,
            gameChar_y + -55,
            4,
            2)

        rect(gameChar_x + 5,
            gameChar_y - 55,
            4,
            2);

        //teeth down
        rect(gameChar_x - 9,
            gameChar_y - 50,
            4,
            2)

        rect(gameChar_x - 2,
            gameChar_y - 50,
            4,
            2);

        rect(gameChar_x + 5,
            gameChar_y - 50,
            4,
            2);
        pop();

        //eye patch
        push();
        stroke(0);
        strokeWeight(2);
        line(gameChar_x - 25, gameChar_y - 75, gameChar_x + 22, gameChar_y - 79);
        pop();
    }
    pop();

    //// GAME OVER AND LEVEL COMPLETE ////

    if (gameOver && !levelComplete) {
        fill(0);
        textSize(200);
        textFont(myFont);
        text("GAME OVER", 250, 300);
        BGsound.stop();
    }

    if (levelComplete) {
        fill(0);
        textSize(150);
        textFont(myFont);
        text("LEVEL COMPLETE!", 250, 300);
        BGsound.stop();
    }

    /// GAME OVER SOUND ///
    // it plays a sound when game is over //
    if (gameChar_y > 450 && gameChar_y < 500) {
        scream.play();
    }
    //// GAME SCORE ////
    // display game score //
    fill(0);
    textSize(50);
    textFont(myFont);
    text("skulls:" + " " + gameScore, 20, 50);

    ///////////INTERACTION CODE//////////

    // character movement to the left //
    if (isLeft) {
        gameChar_x -= 5;
        cameraPosX -= 5;
    }
    // character movement to the right //
    if (isRight) {
        gameChar_x += 5;
        cameraPosX += 5;
    }
    // character falls movement //
    if (gameChar_y < floorPos_y) {
        gameChar_y += 5;
        isFalling = true;

    } else if (gameChar_y == floorPos_y) {
        isFalling = false;
    }

    if (isPlummeting == true) {
        gameChar_y += 10;
        isRight = false;
        isLeft = false;
        isFalling = true;
        gameOver = true;
    }

    // controls when the flag is reached
    if (dFlag < 10) {
        flagpole.isReached = true;
        levelComplete = true;
        gameOver = true;
        isRight = false;
    }
}

function keyPressed() {

    // KEY PRESSED ANIMATIONS //

    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);

    if (key == "a" && !gameOver) {
        isLeft = true;

    } else if (key == "d" && !gameOver) {
        isRight = true;

    } else if (key == " " || "w" && !gameOver) {
        if (isFalling == false)
            gameChar_y -= 200;
    }

    // starts music when character moves //
    if (BGsoundON) {
        BGsound.play();
    }
}

function keyReleased() {

    // KEY RELEASED ANIMATIONS //

    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    if (key == "a") {
        isLeft = false;
    }

    if (key == "d") {
        isRight = false;
    }
    if (key == " " || "w") {
        isFalling == true;
    }
}
