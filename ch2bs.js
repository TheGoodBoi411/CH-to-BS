const fs = require("fs");
console.log("Starting");

// config

let config = {};
if (fs.existsSync(`${__dirname}/config.json`)) {
    config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`));
} else {
    console.warn("config.json not found, using default values");
    config.version = "2.0.0";
    config.copyOverSong = true;
    config.songFile = "song.ogg";
    config.copyOverCover = true;
    config.coverFile = "album.png";
};

if (config.version !== "2.0.0") {
    console.warn(`Unknown version ${config.version}, using 2.0.0`);
    config.version = "2.0.0";
};

// chart file stuff

if (!fs.existsSync(`${__dirname}/notes.chart`)) {
    throw new Error(`notes.chart was not detected in ${__dirname}`);
};

let chart = fs.readFileSync(`${__dirname}/notes.chart`).toString().split(/\r?\n/);
console.log("Got chart file");

let name = chart[2].split('"')[1];
let artist = chart[3].split('"')[1];
let offset = parseInt(chart[6].split('=')[1]);
let songPath = chart[15].split('"')[1];
let bpm = parseInt(chart[20].split('B')[1])/1000;
console.log("Got chart stats");

// create folder and info

if (!fs.existsSync(`${__dirname}/Map Folder`)) {
    fs.mkdirSync(`${__dirname}/Map Folder`);
    console.log("Map folder created");
};

if (!fs.existsSync(`${__dirname}/Map Folder/Info.dat`)) {
    fs.appendFileSync(`${__dirname}/Map Folder/Info.dat`, '');
    console.log("Info.dat created");
};

// copy over files

if (config.copyOverSong) {
    fs.copyFile(`${__dirname}/${config.songFile}`, `${__dirname}/Map Folder/song.ogg`, (err) => {
        if (err) {
          console.error("Song file error:", err);
        } else {
            console.log("Copied song file!");
        };
    });
};

if (config.copyOverCover) {
    fs.copyFile(`${__dirname}/${config.coverFile}`, `${__dirname}/Map Folder/cover.png`, (err) => {
        if (err) {
          console.error("Cover image error:", err);
        } else {
            console.log("Copied cover image!");
        };
    });
};

// write info

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