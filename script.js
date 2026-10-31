// Ex.7 - Working with jQuery (Soul Archive anime fan hub)
$(document).ready(function () {

  // Header title animation on page load
  $(".header-text h1").hide().fadeIn(900);

  // Smooth scrolling for nav links and hero buttons
  $(".nav a, .cta-btn, .cta-outline").click(function (e) {
    e.preventDefault();
    let target = $($(this).attr("href"));
    $("html, body").animate({ scrollTop: target.offset().top - 50 }, 500);
  });

  // 0. Arc guide accordion
  $(".acc-head").click(function () {
    let body = $(this).next(".acc-body");
    $(".acc-body").not(body).slideUp(250);
    $(".acc-head .plus").text("+");
    body.slideToggle(250);
    $(this).find(".plus").text(body.is(":visible") ? "+" : "-");
  });

  // 1. Convention budget calculator
  $("#evaluate").click(function () {
    let amount = parseFloat($("#amount").val());
    let tickets = parseFloat($("#tickets").val()) || 0;
    let merch = parseFloat($("#merchPct").val()) || 0;
    let travel = parseFloat($("#travel").val()) || 0;
    let save = parseFloat($("#saving").val()) || 0;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // the amount can be divided only when the percentages total 100
    let totalPercent = tickets + merch + travel + save;
    if (totalPercent != 100) {
      alert("The amount cannot be divided. Total percentage is " +
        totalPercent + "%, it should be 100%.");
      return;
    }

    $("#ticketAmt").text("Rs." + (amount * tickets / 100));
    $("#merchAmt").text("Rs." + (amount * merch / 100));
    $("#travelAmt").text("Rs." + (amount * travel / 100));
    $("#saveAmt").text("Rs." + (amount * save / 100));
  });

  // 2. Fan merch order bill
  $("#placeOrder").click(function () {
    let total = 0;
    $("#billRows").empty();

    $(".qty").each(function () {
      let qty = parseInt($(this).val()) || 0;
      if (qty > 0) {
        let price = parseInt($(this).data("price"));
        let amount = qty * price;
        total += amount;
        $("#billRows").append("<tr><td>" + $(this).data("name") + "</td><td>" + qty +
          "</td><td>Rs." + price + "</td><td>Rs." + amount + "</td></tr>");
      }
    });

    if (total == 0) {
      alert("Please enter the quantity for at least one item");
      $("#bill").hide();
      $("#noOrder").show();
      return;
    }

    $("#totalPrice").text("Rs." + total);
    $("#noOrder").hide();
    $("#bill").fadeIn(400);
  });

  // 3. Itasha garage
  let bodyColors = ["#f2f2f2", "#c1121f", "#111111", "#7a0e16", "#9aa0a6", "#1d3557"];
  let glassTints = ["rgba(170, 205, 225, 0.85)", "rgba(60, 60, 60, 0.6)",
    "rgba(15, 15, 15, 0.9)", "rgba(193, 18, 31, 0.55)"];
  let bodyIndex = 0;
  let glassIndex = 0;
  let tyreSize = 56;

  $("#bodyBtn").click(function () {
    bodyIndex = (bodyIndex + 1) % bodyColors.length;
    $("#body, #roof").css("background-color", bodyColors[bodyIndex]);
    // white decal stripe on the red/dark bodies stays visible
    $("#decal").css("background-color", bodyIndex == 1 ? "#f2f2f2" : "#c1121f");
  });

  $("#glassBtn").click(function () {
    glassIndex = (glassIndex + 1) % glassTints.length;
    $("#glass").css("background-color", glassTints[glassIndex]);
  });

  $("#tyreUp").click(function () {
    if (tyreSize < 80) {
      tyreSize += 6;
      $(".tyre").animate({ width: tyreSize, height: tyreSize }, 200);
    }
  });

  $("#tyreDown").click(function () {
    if (tyreSize > 38) {
      tyreSize -= 6;
      $(".tyre").animate({ width: tyreSize, height: tyreSize }, 200);
    }
  });

  $("#resetBtn").click(function () {
    bodyIndex = 0;
    glassIndex = 0;
    tyreSize = 56;
    $("#body, #roof").css("background-color", bodyColors[0]);
    $("#decal").css("background-color", "#c1121f");
    $("#glass").css("background-color", glassTints[0]);
    $(".tyre").css({ width: tyreSize, height: tyreSize });
  });

});
