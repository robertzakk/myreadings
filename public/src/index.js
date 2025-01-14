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
            // Lookup users.
        } catch (err) {
            console.log(err);
        };
    }, 1500);
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