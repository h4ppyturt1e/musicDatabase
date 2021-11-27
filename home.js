var videoIndex = 0;
var artistId = "0";

function submit() {
    let url = "https://theaudiodb.com/api/v1/json/2/"
    let artistName = $("#artistName").val();

    videoIndex = 0;

    url = url + "search.php?s=" + artistName;

    if (artistName == "") {
        alert("Please enter a valid artist name in the search box.");
    } else {
        $.get(url, function (data) {
            // $("#raw").html(JSON.stringify(data));
            artistId = analyze(data);
            playVideo(artistId);
        });
    }
}

function playVideo(artistId) {
    console.log(videoIndex);
    console.log(artistId);
    let url = "https://theaudiodb.com/api/v1/json/2/mvid.php?i=" + artistId;
    $.get(url, function (data) {
        console.log(data.mvids.length)
        if (videoIndex >= data.mvids.length) {
            console.log("greater than");
            videoIndex = 0;
        } else if (videoIndex < 0) {
            console.log("less than");
            videoIndex = data.mvids.length - 1;
        }

        let videoData = data.mvids[videoIndex];
        let thumbnail = videoData.strTrackThumb;
        let url = videoData.strMusicVid;
        let desc = videoData.strDescriptionEN;
        let title = videoData.strTrack;
        console.log(thumbnail);
        let line = "<img src=\"" + thumbnail + "\" alt=\"No thumbnail available\"></a>"
        console.log(line);
        $("#thumbnail").html(line);
        // clickable title with url
        $("#songTitle").html("<h2><a href=\"" + url + "\" target=\"_blank\">" + title + "</a></h2>");
        $("#mvDesc").html(desc)
        console.log("PASSED");
    });
}

function nextVideo() {
    videoIndex++;
    playVideo(artistId);
}

function prevVideo() {
    videoIndex--;
    playVideo(artistId);
}

function analyze(data) {
    let artist = data.artists[0];
    let id = artist.idArtist;
    let name = artist.strArtist;
    let image = artist.strArtistThumb;
    let style = artist.strStyle;
    let genre = artist.strGenre;
    let bio = artist.strBiographyEN;
    let wiki = artist.strWebsite;
    let date = artist.intFormedYear;
    let members = artist.intMembers;

    $("#name").html("<h1>" + name + "</h1>");
    $("#image").html("<img src=\"" + image + "\">");
    $("#genre").html("<h2>Genre: " + genre + " with a " + style + " style.</h2>");
    $("#bio").html("<p>" + bio + "</p>");
    $("#wiki").html("<h2>Website: <a href=\"https://" + wiki + "\" target=\"_blank\">" + wiki + "</a></h2>");
    $("#date").html("<h2>Year formed: " + date + "</h2>");
    $("#members").html("<h2>Members: " + members + "</h2>");

    return id;
}
