$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
            
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      
    //   $('.catalog-item__link').each(function(i){
    //     $(this).on('click',function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    //   })

    //   $('.catalog-item__back').each(function(i){
    //     $(this).on('click',function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    //   })

      function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click',function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          });
    
      };
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // Modal

      $("[data-modal=consultation]").on('click', function(){
        $('.overlay,#consultation').fadeIn("slow");
      });

      $('.modal__close').on("click", function(){
        $(".overlay,#consultation,#order,#thanks").fadeOut("slow");
      });

      $(".button_mini").on("click", function(){
        $('.overlay,#order').fadeIn("slow");
      });

      $(".button_mini").each(function(i){
        $(this).on("click",function() {
          $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
        });
      });

      //Validation

      function validateForms(form){
        $(form).validate ({
          rules: {
            name: {
              required: true,
              minlength: 3
            },
            phone:"required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Пожалуйста введите своё имя",
              minlength: jQuery.validator.format("введите {0} символов!")
            },
            phone: "Пожалуйста введите свой телефон",
            email: {
              required: "Пожалуйста введите свой почтовый адрес",
              email: "Не правильно введен почтовый адрес"
            }
          }
      });
      };
      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');

      //maska phone

      $('input[name=phone]').mask("+7 (999) 999-99-99");

      //  отправка сообщение из сайта


      $("form").submit (function(e){
        // e.preventDefault();
        if (!$(this).valid()){
          return;
        }

        $.ajax({
          type: "POST",
          url: "js/mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
  });
      

});