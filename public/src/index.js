/*
    Give the user 2 seconds to type out a user's name before making an API request
    to show all of the relevant results.

    This design is to minimize requests per second.
*/
let lastTimout = null;
$(".navbar-search-input").on("keydown", (event) => {
    if (lastTimout) {
        clearTimeout(lastTimout);
    };

    lastTimout = setTimeout(async () => {
        try {
            $(".search-results").children(".search-profile").remove();

            if ($(".navbar-search-input").val().length === 0) {
                $(".search-results").css("display", "none");
                return;
            };

            $(".search-results").css("display", "flex");

            const response = await axios.get("http://localhost:4000/api/users/" + $(".navbar-search-input").val());

            response.data.forEach((userInfo) => {
                const html = `<button class="btn search-profile" value=${userInfo.name}>
                    <img class="search-image"/>
                    <h2 class="search-username">${userInfo.name}</h2>
                </button>`

                $(".search-results").append(html);
            });
        } catch (err) {
            console.log(err);
        };
    }, 500);
});

$(".search-profile").on("click", (event) => {
    console.log("User ID Visiting: " + $(".search-profile").val());
});

/*
    Book lookup client requst.
*/
// console.log("Searching for books...");
// let timeBeforeRequest = new Date().getTime();
// const response = await axios.get(
//     "http://localhost:4000/books/" +
//     $(".navbar-search-input").val().replaceAll(' ', '+'),
// );

// console.log(`Request took: ${(new Date().getTime() - timeBeforeRequest) / 1000 } seconds.`);
// console.log(response.data);