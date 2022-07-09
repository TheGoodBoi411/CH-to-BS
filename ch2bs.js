const fs = require("fs");
console.log("Starting");

// chart file stuff

console.log(__dirname);

if (!fs.existsSync(`${__dirname}/notes.chart`)) {
    throw new Error("notes.chart was not detected in this folder!");
};

let chart = fs.readFileSync(`${__dirname}/notes.chart`).toString().split(/\r?\n/);
console.log("Got chart file");

let name = chart[2].split('"')[1];
let artist = chart[3].split('"')[1];
let offset = parseInt(chart[6].split('=')[1]);
let songPath = chart[15].split('"')[1];
let bpm = parseInt(chart[20].split('B')[1])/1000;
console.log("Got chart stats");

// create/copy folder and files

if (!fs.existsSync(`${__dirname}/Map Folder`)) {
    fs.mkdirSync(`${__dirname}/Map Folder`);
    console.log("Map folder created");
};

if (!fs.existsSync(`${__dirname}/Map Folder/Info.dat`)) {
    fs.appendFileSync(`${__dirname}/Map Folder/Info.dat`, '');
    console.log("Info.dat created");
};

fs.writeFileSync(`${__dirname}/Map Folder/Info.dat`, JSON.stringify(
{
    _version : "2.0.0",
    _songName : name,
    _songSubName : "",
    _songAuthorName : artist,
    _levelAuthorName : "",
    _beatsPerMinute : bpm,
    _songTimeOffset : offset,
    _shuffle : 0,
    _shufflePeriod : 0,
    _previewStartTime : 0,
    _previewDuration : 0,
    _songFilename : songPath,
    _coverImageFilename : "cover.png",
    _environmentName : "DefaultEnvironment",
    _allDirectionsEnvironmentName : "GlassDesertEnvironment",
    _difficultyBeatmapSets : [
    ]
},
null, 2));
console.log("Info.dat done!");

fs.copyFile(`${__dirname}/song.ogg`, `${__dirname}/Map Folder/song.ogg`, (err) => {
    if (err) {
      console.error("Song file error:", err);
    } else {
        console.log("Copied song file!");
    };
});

fs.copyFile(`${__dirname}/album.png`, `${__dirname}/Map Folder/cover.ogg`, (err) => {
    if (err) {
      console.error("Cover image error:", err);
    } else {
        console.log("Copied cover image!");
    };
});

console.log("Finished");