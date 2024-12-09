document.getElementById("run").addEventListener("click", run);

function run() {
    document.getElementById("err").innerHTML = "";
    var artist = document.getElementById("artist").value.replaceAll(" ", "+");
    var limit = document.getElementById("numResults").value;
    if (artist != "") {
        $.ajax({
            url: 'https://itunes.apple.com/search?entity=musicTrack&attribute=allArtistTerm&term=' + artist + "&limit=" + limit,
            dataType: "json",
            success: process
        });
    } else {
        document.getElementById("err").innerHTML = "Please enter an artist name";
    }
}

function process(data) {
    var songs = data.results;
    var table = document.getElementById("outputTable");
    table.innerHTML = "<tr><th>Number</th><th>Artist Name</th><th>Song Title</th><th>Song Preview</th><th>Album Title</th><th>Album Cover</th></tr>";

    let songInfo = ["artistName", "trackName", "previewUrl", "collectionName", "artworkUrl100"];

    for (let s = 0; s < songs.length; s++) {
        let row = document.createElement("tr");
        // row.id = "row" + s
        for (let i = -1; i < songInfo.length; i++) {
            let info = document.createElement("td");
            if (i == -1) {
                info.innerHTML = s + 1;
            } else if (songInfo[i] == "previewUrl") {
                let audio = document.createElement("audio");
                audio.setAttribute("controls", "");
                let source = document.createElement("source");
                source.setAttribute("src", songs[s].previewUrl);
                
                audio.appendChild(source);
                info.appendChild(audio);
            } else if (songInfo[i] == "artworkUrl100") {
                let img = document.createElement("img");
                img.setAttribute("src", songs[s].artworkUrl100);
                info.appendChild(img);
            } else {
                info.innerHTML = songs[s][songInfo[i]];
            }
            row.appendChild(info);
        }
        table.appendChild(row);
    }
}