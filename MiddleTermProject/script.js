$(document).ready(function () {
  $(".week-btn, .week-btn-1, .week-btn-edge").on("click", function () {
    $(".week-btn, .week-btn-1, .week-btn-edge").removeClass("selected");

    $(this).addClass("selected");

    let weekNumber = $(this).data("week");
    $(".chart-text").text(`"${weekNumber}주차"는 평균 N시간 잤구나!`);
  });
});
