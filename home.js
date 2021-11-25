function submit() {
    let url = "https://theaudiodb.com/api/v1/json/1/"
    let artistName = $("#artistName").val();

    url = url + "search.php?s=" + artistName;

    if (artistName == "") {
        alert("Please enter a valid artist name in the search box.");
    } else {
        $.get(url, function(data){
            // $("#raw").html(JSON.stringify(data));
            analyze(data);
        });
    }
}

function analyze(data) {
    let artist = data.artists[0];
    var artistId = artist.idArtist;
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
}