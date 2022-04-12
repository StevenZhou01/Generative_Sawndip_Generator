let zhuang;
let chinese;
let chineseG;

let input = {
  pos: "name",
  word: "Bouxcuengh",
  sound: "/pou˦˨ ɕuːŋ˧/",
  meaning: ["the Zhuang people"],
}; // input a Zhuang word here. You can find one from the Zhuang JSON data file
let character = "亻"; // input Chinese characters here

let pronun;
let rules = [1, 2, 3, 4, 5, 6];
let rule;
let step;
let chr1, chr2;
let components = [
"⼁","⼃","⼅","⼇","⼌","⼍","⼎","⼐","⼓","⼕","⼖","⼙",
"⼛","⼞","⼡","⼢","⼧","⼬","⼮","⼵","⼶","⼹","⼺","⼻",
"⽁","⽨","⽱","⽧"	,"⾌","⾑","⾘","⺀","⺁","⺂","⺃",
"⺄","⺆","⺇","⺈","⺉","⺋","⺌","⺍","亻","⺔","⺕","忄",
"⺗","手","⺙","⺜","⺡","⺢","⺣","⺤","⺥","⺦","⺧","犭",
"⺩","⺪","⺫","⺬","⺭","⺮","⺯","⺰","⺱","⺲","⺳","⺵",
"⺶","⺷","⺹","⺺","⺻","⺼","⺾","⺿","⻀","⻂","⻃","⻈",
"⻊","⻌","⻍","⻎","⻏","⻐","⻕","⻖","⻗","⻞","⻟","⻠"
];//"⺅" and "亻" are different, "亻" is used here. Please make sure the one you used in in this list. 

// special components : ["⼌","⼐","⼓","⼕","⼖","囗","⼵","⽧","⾌","⺄","⺇","⻌","⻍","⻎", "⼚","⼫","⼴","⾨","⾾","⻔"]; 

//all IPA of the Zhuang letters : ["p","ɓ","m", "f","t","ɗ", "n","ŋ","ɲ","l","k","h","ɕ","ɣ","θ","j","β","ɯ","a","i","e","u","o",];

function preload() {
  zhuang = loadJSON("zhuang.json");
  chinese = loadJSON("chineseD.json");
  chineseG = loadJSON("chineseG.json")
}

function setup() { 
  
  createCanvas(500, 500);
  background(255);
  step = floor(random(2));

  if (character.length == 1) {
    let valid;
    for (let c = 0; c < components.length; c++) {
      if (components[c] == character) {
        valid = 1;
        c = components.length - 1; //if found, then quit the loop
      } else valid = 0;
    } // check if it's a component

    if (valid == 1) {
      // if it is a component
      rule = random([2, 5, 6]); // 3, 4 is for a character
    } else rule = random([2, 3, 4, 6]);

    if (rule == 5) {
      chr1 = character;
    } else if (rule == 2 || rule == 3 || rule == 6) {
      pronun = input.sound;
      console.log("Pronunciation: ", pronun);
      let space = " ";
      let checkSpace = match(pronun, space);
      let ipa = [];
      if (checkSpace != null) {
        console.log("Multisyllabic Word");
        const sound = pronun.split("");
        // find consonants;
        let count = 0;
        for (let i = 0; i < sound.length; i++) {
          if (sound[i] == "/" || sound[i] == " ") {
            // the first IPA and the IPAs after the space
            if (sound[(i + 1) % sound.length] != "/") {
              // skip the last "/"
              ipa[count] = sound[(i + 1) % sound.length]; // "wrap around"
            }
            count++;
          }
        }
      } else if (checkSpace == null) {
        if (rule == 6) {
          rule = 3; // 6 is not applicable for monosyllabic words
        }
        console.log("Monosyllabic Word");
        const sound = pronun.split("");
        ipa = sound[1]; // skip the "/"
      }

      console.log("IPA: ", ipa);
      let regex = [];
      for (let j = 0; j < ipa.length; j++) {
        if (ipa[j] == "p" || ipa[j] == "ɓ") {
          regex[j] = random(["b", "p"]);
        } else if (ipa[j] == "m") {
          regex[j] = random(["m"]);
        } else if (ipa[j] == "f") {
          regex[j] = random(["f"]);
        } else if (ipa[j] == "t" || ipa[j] == "ɗ") {
          regex[j] = random(["t", "d"]);
        } else if ((ipa[j] == "n", ipa[j] == "ŋ", ipa[j] == "ɲ")) {
          regex[j] = random(["n"]);
        } else if (ipa[j] == "l") {
          regex[j] = random(["l"]);
        } else if (ipa[j] == "k") {
          regex[j] = random(["k"]);
        } else if (ipa[j] == "h") {
          regex[j] = random(["h"]);
        } else if (ipa[j] == "ɕ" || ipa[j] == "θ") {
          regex[j] = random(["x", "z", "c", "s", "j", "q"]);
        } else if (ipa[j] == "ɣ") {
          regex[j] = random(["r"]);
        } else if (ipa[j] == "j" || ipa[j] == "i" || ipa[j] == "e") {
          regex[j] = random(["y", "i"]);
        } else if (
          ipa[j] == "β" ||
          ipa[j] == "u" ||
          ipa[j] == "ɯ" ||
          ipa[j] == "o"
        ) {
          regex[j] = random(["w", "u", "o"]);
        } else if (ipa[j] == "a") {
          regex[j] = random(["a"]);
        }
      }
      console.log("Selected pinyin alphabets: ", regex);
      let characters = chinese.characters;
      let selected = [];
      for (let k = 0; k < regex.length; k++) {
        let selectedChr = characters.filter((chr) => {
          let pinyin = chr.pinyin[0];
          let pinPar = pinyin.split("");
          let m = match(pinPar[0], regex[k]); // only check the initials/first letters
          if (m != null) {
            return chr;
          }
        });
        selected[k] = random(selectedChr);
      }
      if (rule == 6) {
        chr1 = selected[0].character;
        chr2 = selected[1].character;
      } else if (rule == 2) {
        chr1 = character;
        chr2 = random(selected);
        chr2 = chr2.character
      } else if (rule == 3) {
        chr1 = random(selected);
        chr1 = chr1.character
      }
    } else if (rule == 4) {
      chr1 = character;
    }
  } else if (character.length == 2) {
    rule = 1;
    const chr = character.split("");
    chr1 = chr[0];
    chr2 = chr[1];
  }

  console.log("Rule: ", rule);
  console.log("Character1: ", chr1);
  console.log("Character2: ", chr2);
}

function draw(){
  background(255);
  rectMode(CENTER);
  stroke(0,50);
  rect(width / 2, height / 2, 300, 300);
  line(
    width / 2,
    height / 2 - 150,
    width / 2,
    height / 2 + 150
  );
  line(width / 2 - 300 / 2, height / 2, width / 2 + 300 / 2, height / 2);
  
let chrA;
let chrB;
let chr01;
let chr02;
let characters = chineseG.characters;
  
if (rule == 1||rule == 2||rule == 6){
  chrA = characters.filter((chr)=>{
    if(chr.character == chr1){
      return chr;
    }
  });
  chrB = characters.filter((chr)=>{
    if(chr.character == chr2){
      return chr;
    }
  });
  
  chr01 = chrA[0];
  chr02 = chrB[0];
  
  push();
  translate(100, 370);
  if(chr01.character == "⼎"||chr01.character == "⼻"||chr01.character =="亻"||chr01.character =="忄"||chr01.character =="⺡"||chr01.character =="⺦"||chr01.character =="犭"||chr01.character =="⺩"||chr01.character =="⺪"||chr01.character =="⺬"||chr01.character =="⺭"||chr01.character =="⺯"||chr01.character =="⺰"||chr01.character =="⻂"||chr01.character =="⻈"||chr01.character =="⻐"||chr01.character =="⻕"||chr01.character =="⻖"||chr01.character =="⻞"||chr01.character =="⻟"||chr01.character =="⻠"){
  push();
  scale(0.2, -0.3);
  translate(-100, 0);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
 
  scale(1, 1);
  translate(500, 0);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
}
  pop();
 }else if(chr01.character == "⽨"||chr01.character == "⼇"||chr01.character == "⼍"||chr01.character == "⼡"||chr01.character == "⼧"||chr01.character == "⺂"||chr01.character == "⺈"||chr01.character == "⺌"||chr01.character == "⺍"||chr01.character == "⺕"||chr01.character == "⺤"||chr01.character == "⺥"||chr01.character == "⺧"||chr01.character == "⺫"||chr01.character == "⺻"||chr01.character == "⺷"||chr01.character == "⺮"||chr01.character == "⺱"||chr01.character == "⺲"||chr01.character == "⺳"||chr01.character == "⻗"){
  push();
  translate(0, -80);
  scale(0.3, -0.2);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  translate(0, -450);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();
          }
  else if(chr01.character =="囗"){
  push();
  translate(0, 0);
  scale(0.3, -0.3);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  
  translate(230, 130);
  scale(0.55, 0.7);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();
  }else if (chr01.character =="⼌"|| chr01.character =="⺇"|| chr01.character =="⾨"|| chr01.character =="⾾"|| chr01.character =="⻔"){ 
  push();
  translate(-20, 10);
  scale(0.33, -0.33);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }

  scale(0.5, 0.5);
  translate(500, 80);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();
  }else if(chr01.character =="⼐"){
    push();
  translate(-20, 30);
  scale(0.33, -0.33);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  translate(210, 230);
  scale(0.6, 0.6);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();
  }else if(chr01.character == "⼕"||chr01.character =="⼖"){
  push();
  translate(-20, 10);
  scale(0.33, -0.33);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  translate(280, 140);
  scale(0.6, 0.6);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();
}else if(chr01.character == "⽧"||chr01.character == "⾌"||chr01.character == "⼚"||chr01.character =="⼫"||chr01.character =="⼴"){
  push();
  translate(0, 10);
  scale(0.33, -0.33);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  translate(200, 60);
  scale(0.7, 0.7);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();
}else if(chr01.character == "⼓"|| chr01.character =="⺄"){
  push();
  translate(-20,10);
  scale(0.33, -0.33);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  translate(250,150);
  scale(0.45, 0.45);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();  
}else if(chr01.character == "⼵"||chr01.character =="⻌"||chr01.character =="⻍"||chr01.character =="⻎"){
  push();
  translate(10, 0);
  scale(0.26, -0.26);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }

  translate(300, 180);
  scale(0.75, 0.8);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();
}else{
  if (step == 0){
     push();
  translate(100, 0);
  scale(0.2, -0.3);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }

  translate(-450, 0);
  scale(0.7, 1);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  pop();
    
  }else if(step == 1){
  push()
  translate(0, -105);
  scale(0.3, -0.2);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  translate(0, -680);
  let ctx02 = drawingContext;
  ctx02.fillStyle = "black";
  ctx02.strokeStyle = "black";
  for (let j = 0; j < chr02.strokes.length; j++) {
    p = new Path2D(chr02.strokes[j]);
    ctx02.fill(p);
  }
  pop();
  }
}
  pop();

}else if(rule == 3 ||rule == 4 ||rule == 5){
   chrA = characters.filter((chr)=>{
    if(chr.character == chr1){
      return chr;
    }
  });
  chr01 = chrA[0];
  
  translate(100, 370);

  push();
  scale(0.2, -0.3);
  translate(280, 0);
  let ctx01 = drawingContext;
  ctx01.fillStyle = "black";
  ctx01.strokeStyle = "black";
  for (let j = 0; j < chr01.strokes.length; j++) {
    p = new Path2D(chr01.strokes[j]);
    ctx01.fill(p);
  }
  pop();
}
}

function mouseClicked(){
  background(255);
  step = floor(random(2));
  if (character.length == 1) {
    let valid;
    for (let c = 0; c < components.length; c++) {
      if (components[c] == character) {
        valid = 1;
        c = components.length - 1; //if found, then quit the loop
      } else valid = 0;
    } // check if it's a component

    if (valid == 1) {
      // if it is a component
      rule = random([2, 5, 6]); // 3, 4 is for a character
    } else rule = random([2, 3, 4, 6]);

    if (rule == 5) {
      chr1 = character;
    } else if (rule == 2 || rule == 3 || rule == 6) {
      pronun = input.sound;
      console.log("Pronunciation: ", pronun);
      let space = " ";
      let checkSpace = match(pronun, space);
      let ipa = [];
      if (checkSpace != null) {
        console.log("Multisyllabic Word");
        const sound = pronun.split("");
        // find consonants;
        let count = 0;
        for (let i = 0; i < sound.length; i++) {
          if (sound[i] == "/" || sound[i] == " ") {
            // the first IPA and the IPAs after the space
            if (sound[(i + 1) % sound.length] != "/") {
              // skip the last "/"
              ipa[count] = sound[(i + 1) % sound.length]; // "wrap around"
            }
            count++;
          }
        }
      } else if (checkSpace == null) {
        if (rule == 6) {
          rule = 3; // 6 is not applicable for monosyllabic words
        }
        console.log("Monosyllabic Word");
        const sound = pronun.split("");
        ipa = sound[1]; // skip the "/"
      }

      console.log("IPA: ", ipa);
      let regex = [];
      for (let j = 0; j < ipa.length; j++) {
        if (ipa[j] == "p" || ipa[j] == "ɓ") {
          regex[j] = random(["b", "p"]);
        } else if (ipa[j] == "m") {
          regex[j] = random(["m"]);
        } else if (ipa[j] == "f") {
          regex[j] = random(["f"]);
        } else if (ipa[j] == "t" || ipa[j] == "ɗ") {
          regex[j] = random(["t", "d"]);
        } else if ((ipa[j] == "n", ipa[j] == "ŋ", ipa[j] == "ɲ")) {
          regex[j] = random(["n"]);
        } else if (ipa[j] == "l") {
          regex[j] = random(["l"]);
        } else if (ipa[j] == "k") {
          regex[j] = random(["k"]);
        } else if (ipa[j] == "h") {
          regex[j] = random(["h"]);
        } else if (ipa[j] == "ɕ" || ipa[j] == "θ") {
          regex[j] = random(["x", "z", "c", "s", "j", "q"]);
        } else if (ipa[j] == "ɣ") {
          regex[j] = random(["r"]);
        } else if (ipa[j] == "j" || ipa[j] == "i" || ipa[j] == "e") {
          regex[j] = random(["y", "i"]);
        } else if (
          ipa[j] == "β" ||
          ipa[j] == "u" ||
          ipa[j] == "ɯ" ||
          ipa[j] == "o"
        ) {
          regex[j] = random(["w", "u", "o"]);
        } else if (ipa[j] == "a") {
          regex[j] = random(["a"]);
        }
      }
      console.log("Selected pinyin alphabets: ", regex);
      let characters = chinese.characters;
      let selected = [];
      for (let k = 0; k < regex.length; k++) {
        let selectedChr = characters.filter((chr) => {
          let pinyin = chr.pinyin[0];
          let pinPar = pinyin.split("");
          let m = match(pinPar[0], regex[k]); // only check the initials/first letters
          if (m != null) {
            return chr;
          }
        });
        selected[k] = random(selectedChr); // randomly choose 20 characters
      }
      if (rule == 6) {
        chr1 = selected[0].character;
        chr2 = selected[1].character;
      } else if (rule == 2) {
        chr1 = character;
        chr2 = random(selected);
        chr2 = chr2.character
      } else if (rule == 3) {
        chr1 = random(selected);
        chr1 = chr1.character
      }
    } else if (rule == 4) {
      chr1 = character;
    }
  } else if (character.length == 2) {
    rule = 1;
    const chr = character.split("");
    chr1 = chr[0];
    chr2 = chr[1];
  }

  console.log("Rule: ", rule);
  console.log("Character1: ", chr1);
  console.log("Character2: ", chr2);
}
