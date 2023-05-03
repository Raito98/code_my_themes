var home_show_popup = {
  init: function () {
    $(".home-header-contact").on("click", function () {
      $(".modal-register-news").modal("show");
    });
  },
};
var home_menu = {
  init: function () {
    $(".home-menu-mobile-icon").on("click", function () {
      $(".home-header-menu").slideToggle();
    });
  },
};
// home slider
var home_slider = {
  init: function () {
    var multiple_items = $(".multiple-items");
    var list_category_post = $(".list-category-post");
    if (multiple_items.length > 0) {
      multiple_items.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      });
    }

    if (list_category_post.length > 0) {
      list_category_post.slick({
        infinite: false,
        slidesToShow: 3,
        arrows: true,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      });
    }
  },
};
var comment = {
  init: function () {
    $('textarea[name="comment"]').on("click", function () {
      $(".inform-comment").toggleClass("active");
    });
  },
};
var scroll_top = {
  init: function () {
    $(".scroll-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    $(window).on("scroll", function () {
      if ($(window).scrollTop() != 0) {
        $(".scroll-top").hide();
        if (
          $(window).height() + $(window).scrollTop() >=
          $(document).height() / 12
        ) {
          $(".scroll-top").show();
        }
      }
    });
  },
};
var google_form = {
  init: function () {
    var send_contact = $(".contact-form");
    var send_order_form = $(".form-footer");
    var check = false;
    if (send_order_form.length > 0) {
      send_contact = send_order_form;
      check = true;
    }
    if (send_contact.length > 0) {
      send_contact.on("submit", function () {
        var container = $(this);
        google_form.send_contact_to_google(container, check);
        return false;
      });
    }
  },

  send_contact_to_google: function (container, check) {
    var fullname = $(container).find('input[name="fullname"]').val();
    var numberphone = $(container).find('input[name="numberphone"]').val();
    var content = $(container).find('[name="content"]').val();
    var data_url = window.location.href;
    var data_url_referer = document.referrer;
    var url_goole =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfDXZQmZm0BlJ4Wy4UtbW_iPJIO3kTfftT4mURBwB4noS80MQ/formResponse";
    var data = {
      "entry.1372770973": fullname,
      "entry.1287158033": numberphone,
      "entry.1594171070": content,
      "entry.208542607": data_url,
      "entry.1387645454": data_url_referer,
    };
    if (check) {
      url_goole =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfoMQN8X_O2JFrCd0PTgm2wyuhXkuE1jRUV8CJnU1z3bD8htA/formResponse";
      data = {
        "entry.1984379434": fullname,
        "entry.2117769144": numberphone,
        "entry.257190855": data_url,
        "entry.211429153": data_url_referer,
      };
    }
    if (fullname !== "" && numberphone !== "") {
      $.ajax({
        url: url_goole,
        data: data,
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function () {
            $(container).closest("form").find("input[type=text]").val("");
            $(container).find("button").attr("disabled", "disabled");
            alert("Gửi thành công!");
          },
          200: function () {
            $(container).closest("form").find("input[type=text]").val("");
            $(container).find("button").attr("disabled", "disabled");
            alert("Gửi thành công!");
          },
        },
      });
    } else {
      alert("Kiểm tra lại các thông vừa nhập");
    }
  },
};
jQuery(function ($) {
  home_slider.init();
  home_menu.init();
  google_form.init();
  home_show_popup.init();
  comment.init();
  scroll_top.init();
});
