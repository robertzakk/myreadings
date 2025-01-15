$(".profile-input-btn").on("click", (event) => {
    $(".profile-input").trigger("click");
});

$(".profile-input").on("change", (event) => {
    var fileReader = new FileReader();
    fileReader.onload = function () {
        $(".profile-image").css("display", "block");
        $(".profile-image").attr("src", fileReader.result);

        $(".bi-file-earmark-arrow-up").remove();
    }

    fileReader.readAsDataURL($(".profile-input").prop("files")[0]);
})