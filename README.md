# CH-to-BS
Convert a Clone Hero `notes.chart`'s properties into an `Info.dat` file. This does not, and never will, create a map from a chart.
## Put `ch2bs.js` inside your chart folder and run it with node.js

### Input
```
Chart - TheGoodBoi
├── notes.chart
├── album.png
├── song.ogg
├── background.png
├── song.ini
└── ch2bs.js
```
### Output
```
Map Folder
├── Info.dat
├── song.ogg
└── cover.png
```

## Todo:
- [x] Add a config
- [ ] Update for v3
- [ ] Add BPM changes
- [ ] Add some way to convert lyric events to a SW file

## Notice:
This JavaScript file will create and alter files, but **only** in the chart file directory. You can look at the code yourself if you want to make sure you're safe.
