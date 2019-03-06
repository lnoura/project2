/*
  Please add all Javascript code to this file.
*/

$(function () {

  var newsapi = "789ea52a28e648ce902af9da669a1d0a";
  var $articles = $("#main");

  $('#main').html('');

  var NG = "https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=" + newsapi;
  var NYT = "https://newsapi.org/v2/top-headlines?sources=the-new-york-times&apiKey=" + newsapi;
  var theverg = "https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=" + newsapi;

  loadSources(NYT);
  loadSources(NG);
  loadSources(theverg);


  function loadSources(link) {
    $.ajax({
      url: link,
      data: {
        format: 'json'
      },
      beforeSend: function () {
        $('#popUp').removeClass('hidden');
      },

      complete: function () {
        $('#popUp').addClass('hidden');
      },
      success: function (response) {
        post(response);
        $("#loader").hide();
      },
      error: function (request) {
        alert("Eroor: can't loud the source");
      },
    });
  };


  $("h1:first").on('click', function () {
    location.reload();
  })

  $("#one").on('click', function () {
    $("article").slice(0, 10).show();
    $("article").slice(10, 30).hide();


  })

  $("#two").on('click', function () {
    $("article").slice(0, 11).hide();
    $("article").slice(10, 20).show();
    $("article").slice(20, 30).hide();

  })

  $("#three").on('click', function () {
    $("article").slice(0, 20).hide();
    $("article").slice(20, 30).show();

  })



  var post = function (response) {
    for (var i = 0; i < response.articles.length; i++) {
      var $newArticle = $("<article>");

      var $infoSection = $("<section>").addClass("infoSection");
      var $newPara = $("<p>").html(response.articles[i].description).hide();
      var $newLink = $("<h8>").html(response.articles[i].url).hide();

      var $imageSection = $("<section>").addClass("featuredImage")
      var $imageThumb = $('<img src=' + response.articles[i].urlToImage + '>');

      $imageSection.append($imageThumb);


      var $contentSection = $("<section>").addClass("articleContent");
      var $articleLink = $('<a href=#' + response.articles[i].title + '>' + '</a>');
      var $title = $('<h3>' + response.articles[i].title + '</h3>');
      var $categoryTag = $('<h6 >' + response.sources + '</h6>');

      $contentSection.append($articleLink).append($title).append($categoryTag).append($newPara).append($newLink);


      var $divAdd = $("<div>").addClass("clearfix");


      $newArticle.append($imageSection).append($contentSection).append($infoSection).append($divAdd).addClass("article");

      $articles.append($newArticle);




      $('#main').click('article', function (event) {
        event.preventDefault();

        $('#popUp').show();
        $('#popUp').removeClass('loader hidden');

        $("#popUp .container h1").text($(event.target).text());

        var $summary = $(event.target).siblings("p").text();
        $("#popUp .container p").text($summary);

        var $link = $(event.target).siblings("h8").text();
        $("#popUp a").attr('href', $link);

        $('.closePopUp').click('#closePopUp', function () {
          $("#popUp a").attr('href', "#");
          $('#popUp').hide();
          $('#popUp').addClass('loader hidden');
        })
      });
    };
  };

  $("#search").on('click', function () {
    $("#search").toggleClass("active");
  })

});

