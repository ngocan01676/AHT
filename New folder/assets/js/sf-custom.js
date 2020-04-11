$(document).ready(function () {
    // replace text page search
    if($(".search._wrap").find(".page-sidebar .navList.navList--inner .navList-action.navList-action--checkbox").length)
    { 
        $(".search._wrap").find(".page-sidebar .navList.navList--inner .navList-action.navList-action--checkbox").each(function(){
            var textOld = $(this).text();
            if(textOld.search("&#039;") != -1)
            {
                textOld = textOld.replace("&#039;","'");
            }
            if(textOld.search("&amp;") != -1)
            {
                textOld = textOld.replace("&amp;","&");
            }

            $(this).text(textOld);
        });
    }    


    function alignHeight(selector) {
        jQuery(selector).css('height', '');
        var minHeight = 0;
        jQuery(selector).each(function () {
            if (minHeight < jQuery(this).outerHeight()) {
                minHeight = jQuery(this).outerHeight();
            }
        });
        if (minHeight > 0) {
            jQuery(selector).css('height', minHeight);
        }
    }
    alignHeight('.product-guides_wrap .blocks .block .content p');
    alignHeight('.cart._wrap .card .card-body .card-title');
    alignHeight('.product-guides_wrap .blocks .block .content a:not(.button)');
    alignHeight('.blog._wrap .blog_page#blog_listing .blog-post-body .blog-post');
    var num = 0; 
    var interval_obj = setInterval(function(){
        alignHeight('.search .card-body .card-title');
        //alignHeight('.quickSearchResults .card-body .card-title');
        num ++;
        if(num == 100)
        {
            clearInterval(interval_obj);
        }
    }, 200);

    var AlignHieghtContent = setInterval(myTimer, 1000);

    function myTimer() {
        if ($(".tabs-contents-home .productCarousel-slide").hasClass("slick-active")) {
            alignHeight('.card .card-body .card-title');
        }
    }

    function myStopFunction() {
        clearInterval(AlignHieghtContent);
    }

    $(window).resize(function () {
        setTimeout(function () {
            alignHeight('.card .card-body .card-title');
        }, 1000);
    });
   
    // var count = 0;
    // var interval_obj = setInterval(function(){
    //     // $('.whatusers .content').slick({
    //     //     slidesToShow: 3,
    //     //     slidesToScroll: 1,
    //     //     infinite: false,
    //     //     leftMargin: 20,
    //     //     prevArrow: '<button class="fal fa-chevron-left"></button>',
    //     //     nextArrow: '<button class="fal fa-chevron-right"></i></button>',
    //     //     responsive: [{
    //     //         "breakpoint": 767,
    //     //         "settings": {
    //     //             "slidesToShow": 1.15,
    //     //             "slidesToScroll": 1
    //     //         }
    //     //     }]
    //     // }); 

    //     count ++;
    //     if(count == 100){
    //         clearInterval(interval_obj);
    //     }
       
    // }, 200);

    $('[data-cart-status] i').click(function () {
        $(this).parent().hide();
    })

    var cookieGrid = $.cookie("selected_class");
    if (cookieGrid) {
        $(".category").addClass(cookieGrid);
    }
    $('body').on('click', ".custom-grid-full", function () {
        //store the value
        $.cookie("selected_class", "custom-grid-cate");
        jQuery(".category").addClass("custom-grid-cate");

        function alignHeight(selector) {
            jQuery(selector).css('height', '');
            var minHeight = 0;
            jQuery(selector).each(function () {
                if (minHeight < jQuery(this).outerHeight()) {
                    minHeight = jQuery(this).outerHeight();
                }
            });
            if (minHeight > 0) {
                jQuery(selector).css('height', minHeight);
            }
        }
        setTimeout(function () {
            alignHeight('.card .card-body .card-title');
            jQuery(window).resize(function () {
                setTimeout(function () {
                    alignHeight('.card .card-body .card-title');
                }, 200);
            });
        }, 200);
    });
    $('body').on('click', ".custom-grid-part", function () {
        $.cookie("selected_class", "");
        jQuery(".category").removeClass("custom-grid-cate");

        function alignHeight(selector) {
            jQuery(selector).css('height', '');
            var minHeight = 0;
            jQuery(selector).each(function () {
                if (minHeight < jQuery(this).outerHeight()) {
                    minHeight = jQuery(this).outerHeight();
                }
            });
            if (minHeight > 0) {
                jQuery(selector).css('height', minHeight);
            }
        }
        setTimeout(function () {
            alignHeight('.card .card-body .card-title');
            jQuery(window).resize(function () {
                setTimeout(function () {
                    alignHeight('.card .card-body .card-title');
                }, 200);
            });
        }, 200);
    });
    //end event custom grid cate after filter
    var resultText = "";
    var sumElement = $('.banner-cate-des-hidden').children().length;
    var num = 0; 
    $('.banner-cate-des-hidden p').each(function(){
        
              resultText += "<p>"+$(this).text()+"</p>";
              num ++;
              if(num == 1)
              return false;
    });
    $('.banner-cate-des').prepend(resultText);
    $('.banner-cate-des .showmore').click(function () {
        $(this).next().slideToggle();
        $(this).parent().parent().toggleClass('opening');
    });

    $('.banner-cate-des-hidden .showless').click(function () {
        $(this).next().slideToggle();
        $(this).parent().parent().removeClass('opening');
    });
    $('.custom-filter-mobile .filter-by').click(function () {
        $(this).parent().parent().toggleClass('opening');
        $(this).parent().parent().removeClass('is-opening');
    });
    $('.custom-filter-mobile .sortby').click(function () {
        $(this).parent().parent().removeClass('opening');
        $(this).parent().parent().addClass('is-opening');
    });
    if ($('#cate-play-video').length) {
        var cnt = 0;
        var myInterval = setInterval(function () {
            cnt += 1;
            $("#cate-play-video").fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                smallBtn: true,
                btnTpl: {
                    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><i class="fal fa-times"></i></button>',
                },
                afterLoad: function () {
                    $(".fancybox-content").css({
                        "max-width": 925,
                        "max-height": 520.5
                    });
                },
                afterShow: function () {
                    $(".fancybox-content").css({
                        "max-width": 925,
                        "max-height": 520.5
                    });
                }

            });
            if (cnt == 10) {
                clearInterval(myInterval);
            }
        }, 300);
    }
    // $("#cate-play-video").fancybox({
    // 	openEffect	: 'none',
    // 	closeEffect	: 'none',
    // 	smallBtn    : true,
    // 	btnTpl: {
    // 		smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><i class="fal fa-times"></i></button>',
    // 	},
    // 	afterLoad: function() {
    // 		$(".fancybox-content").css({"max-width": 925, "max-height": 520.5});
    // 	},
    // 	afterShow : function() {
    // 		$(".fancybox-content").css({"max-width": 925, "max-height": 520.5});
    // 	}

    // });
    if ($(window).width() > 800) {
        $('.navPages-container .navPages .navPages-list .navPages-item .navPages-action').click(function (e) {
            e.stopPropagation();
            window.location.href = $(this).attr('href');
        });
        $('.navPages-container .navPages .navPages-list .navPages-item .navPage-subMenu .navPage-subMenu-list .navPage-subMenu-item.hidden').remove();
    } else {
        $('.mobileMenu-toggle').click(function () {
            $('.navPages-container .navPages .navPages-list .navPages-item').removeClass('padding0').removeClass('hidden').removeClass('active');
            $('.navPages-container .navPages .navPages-list').removeClass('padding0').removeClass('hidden');
            $('.navPages-container .navPages .phone-header').removeClass('padding0').removeClass('hidden');
            $('.navPages-container .navPages .navPages-list .navPages-item .navPage-subMenu').removeClass('padding0')
            $('.navPages-container .navPages .navPages-list .navPages-item .navPages-action').show();
            $('.navPages-container .navPages .navPages-list .navPages-item > .navPages-action').show();
            $('.navPages-container .navPages .navPages-list .navPages-item .navPage-subMenu .navPage-subMenu-list .navPage-subMenu-item').show().removeClass('active');
        });
        $('.navPages-container .navPages .navPages-list .navPages-item>.navPages-action:not(.select-all).has-subMenu').click(function (e) {
            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass('active').siblings().removeClass('hidden');
                $('.navPages-container .navPages .navPages-list.navPages-list--user, .navPages-container .navPages .phone-header').removeClass('hidden');
                $('.navPages-container .navPages .navPages-list:not(.navPages-list--user)').removeClass('padding0');
            } else {
                $(this).parent().addClass('active').removeClass('hidden').siblings().addClass('hidden').removeClass('active');
                $('.navPages-container .navPages .navPages-list.navPages-list--user, .navPages-container .navPages .phone-header').addClass('hidden');
                $('.navPages-container .navPages .navPages-list:not(.navPages-list--user)').addClass('padding0');
            }
        });
        $('.navPages-container .navPages .navPages-list .navPages-item .navPage-subMenu .navPage-subMenu-list .navPage-subMenu-item .navPage-subMenu-action:not(.select-all).has-subMenu').click(function (e) {
            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass('active').siblings().show();
                $('.navPages-container .navPages .navPages-list .navPages-item > .navPages-action').show();
                $('.navPages-container .navPages .navPages-list .navPages-item .navPage-subMenu').removeClass('padding0');
            } else {
                $(this).parent().addClass('active').show().siblings().hide().removeClass('active');
                $('.navPages-container .navPages .navPages-list .navPages-item > .navPages-action').hide();
                $('.navPages-container .navPages .navPages-list .navPages-item .navPage-subMenu.is-open').addClass('padding0');
            }
        });
        $('.footer > .container .block-footer h3').click(function () {
            $(this).toggleClass('active');
            $(this).next().slideToggle();
        });
    }
    $(document).on("click", ".alertBox i", function () {
        $(this).parent().remove();
    });
    // Toggle product home
    if ($(window).width() < 768) {
        $(document).on("touchstart", ".tabs-contents-home .tab-content h3", function () {
            $(this).toggleClass('active');
            $(this).next().toggleClass('show-slider');
            alignHeight('.whychoosedocs .content .item h3');
        });
    }
    alignHeight('.whychoosedocs .content .item h3');
    setTimeout(function () {
        alignHeight('.category .card .card-body .card-title');
        jQuery(window).resize(function () {
            setTimeout(function () {
                alignHeight('.category .card .card-body .card-title');
            }, 200);
        });
    });

    // trim text blog
    function trimText(str, wordCount) {
        var strArray = str.split(' ');
        var subArray = strArray.slice(0, wordCount);
        var result = subArray.join(" ");
        return result + '...';
    }
    $('.content-blog .content-text > p').each(function(){
        var str = $(this).text();
        var result = trimText(str, 80);
        $(this).text(result);
        if ($(window).width() < 767) {
            var result = trimText(str, 23);
            $(this).text(result);
        }
    });
    //set slide product
    if ($('.sidebar_desktop').length) {
        var myInterval = setInterval(function () {
            if ($(window).width() < 767) {
                if ($('.sidebar_desktop ul').length) {
                    $('.sidebar_desktop ul').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                        leftMargin: 20,
                        prevArrow: '<button class="far fa-chevron-left"></button>',
                        nextArrow: '<button class="far fa-chevron-right"></i></button>'
                    });
                }
            }
            if ($('.sidebar_desktop ul').length) {
                clearInterval(myInterval);
            }
        }, 300);
    }
    // // addhtml to cart
    // 	setTimeout(function(){
    // 	 $('.custom-cart-products').load('/ .productCarousel-slide');
    // 	 console.log(1);
    // 	}, 3000);
    // Dropdown Myaccount
    $('.navBar.navBar--sub.navBar--account').prepend("<h3 class='title'>Account Menu</h3>");
    $('.navBar.navBar--sub.navBar--account .title').on('click', function () {
        $('.navBar-section').slideToggle();
        $(this).toggleClass('active');
    });
    $("#form-newletter").validate({
        rules: {
            nl_email: {
                required: true,
                email: true
            }
        },
        messages: {
            nl_email: {
                required: "Please enter a valid  address, such as john@example.com",
                email: "Please enter a valid  address, such as john@example.com"
            }
        }
    });

    //Remove border in myorder (Page Myaccount)
    if ($(".account-content").children("ul").length == 0 || $(".account-content").children("ul.account-list").children().length == 0) {
        $(".account-content").addClass("remove-border");

    }



    // Validate field State in page add address
    jQuery.validator.addMethod("validateNumber", function (value, element) {
        return this.optional(element) || /^[0-9\s]*$/.test(value);
    }, 'Please enter a valid number.');
    // chan type number phone
    $("#FormField_7_input").attr("type","number");
    $(".form.add-address").validate({
        rules: {
            "FormField[2][7]": {
                //validateNumber: true,
                minlength: 10,
                maxlength: 20
            },
        }

    });
    $('input[name="FormField[2][12]"]').on('blur', function () {
        $(this).valid();
    }).on('focus', function () {
        $(this).valid();
    });

    // Validate form edit account page all with method 
    // move element fix tabindex
    $("#FormField_24").insertAfter("#FormField_1");
    // Add method
    $.validator.addMethod("notEqual", function (value, element) {
        var check = ($('#FormField_24_input').val() === '') ? true : false;
        var result = false;
        if (!check) {
            if ($('#FormField_3_input').val() != $('#FormField_24_input').val()) {
                result = true;
            }
        }

        //console.log($('#FormField_3_input').val() != $('#FormField_24_input').val());
        return result;
    }, "The new password must not be the same as the old password");

    //validate number phone page create 

    $('.form.create-accounts').validate({
        rules: {
            "FormField[2][7]": {
                //required: true,
                validateNumber: true,
                minlength: 10,
                maxlength: 20,
            }
        },
        messages: {
            "FormField[2][7]": {
               // required: "The 'Phone Number' field cannot be blank.",
            },
        }

    });

    //validate page edit account

    $(".form.edit_account_form").validate({
        rules: {
            "FormField[1][24]": {
                //notEqual: true
                required: true,
            },
            "FormField[1][2]": {
                required: true,
            },
            "FormField[1][3]": {
                //notEqual: true,
                //required: true,
                //equalTo: "#FormField_2_input"
            },
            "account_phone": {
               // required: true,
                validateNumber: true,
                minlength: 10,
                maxlength: 20,
            },

        },
        messages: {
            "FormField[1][2]": {
                required: 'You must enter new password.',
            },
            "FormField[1][3]": {
                //required: 'You must enter comfirm  password.',
            },
            "FormField[1][24]": {
                //equalTo: 'The password is not the same'
                required: 'You must enter your current password.',
            },
            "account_phone": {
               // required: "The 'Phone Number' field cannot be blank.",
            },
        }
    });

    $(".video-tutorials li a").fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        smallBtn: true,
        'width': 1090,
        overlayColor: '#000',
        overlayOpacity: '0.35',
        btnTpl: {
            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small button_video" title="{{CLOSE}}">Close <i class="far fa-times"></i></button>',
        },
        afterLoad: function () {
            $(".fancybox-content").css({
                "max-width": 1090,
                "max-height": 616
            });
        },
        afterShow: function (instance, current) {
            $(".fancybox-content").css({
                "max-width": 1090,
                "max-height": 616
            });
        }

    });
    // Custom page FAQ
    $('.content-location .content-left .content-text div h3').on("click", function () {
        $(this).next().slideToggle();
        $(this).toggleClass('open-content');
    });
    $('.content-location .content-left .content-text >div h3').first().trigger("click");
    // Custom page FAQ
    $('.custom-faq-container div').on("click", function () {
        $(this).next().slideToggle();
        $(this).toggleClass('active');
    });
    // // fix scroll sibar product
    // $(function () {
    //     var top = $('.productView-details').offset().top;
    //     var footTop = $('.end').offset().top;
    //     var maxY = footTop;

    //     $(window).scroll(function (evt) {
    //         var y = $(this).scrollTop();
    //         if (y > top) {
    //             if (y < maxY) {
    //                 $('.productView-details').removeClass('fixfooter');
    //                 $('.productView-details').addClass('fixContent');
    //             } else {
    //                 $('.productView-details').removeClass('fixContent');
    //                 $('.productView-details').addClass('fixfooter');
    //             }
    //         } else {
    //             $('.productView-details').removeClass('fixContent');
    //         }
    //     });
    // });
    // Requote custom page
    if ($('.link_json_file').length) {

        $link_json = $('.link_json_file').attr('href');
        console.log($link_json);
        //$link_json ='https://safetyculture-dev.mybigcommerce.com/content/product_safe_dev.json'
        $.getJSON($link_json, function (data) {

            // convert json product
            var json_product = JSON.parse(JSON.stringify(data.product));
            // json_product = Object.values(json_product);
            var items = [];
            $.each(json_product, function (key, val) {
                // $.each(val, function (k, v) {

                //     html += '<li>';
                //     if (k == 'productname') {
                //          html += v;
                //     }
                //     if (k == 'productid') {
                //          html += v;
                //     }
                //     html += '</li>';
                // });
                // console.log(key);
                // console.log(val);
                // val = Object.values(val);
                items[key] = val;
            });
            var html = '';
            for (var i = 0; i < items.length; i++) {

                html += "<div class= 'item'>";
                // product name
                html += "<div class='detail'>";
                html += '<h4>' + items[i].productname + '</h4>';
                //product view detail
                html += '<a href="' + items[i].url + '">View detail' + '</a>';

                html += '</div>';

                html += '<button class="button button-primary button_add_quote" data-custom = "' + items[i].productid + '">Add to quote</button>';
                //product price
                html += '<p>$' + items[i].price + '</p>';
                html += '</div>';

            }
            //console.log(items);
            $('.product_listing_quote').html(html);
            //console.log(html);

            $(".button_add_quote").on("click", function () {
                //console.log($(this));
                let product_id = $(this).attr('data-custom');
                console.log(product_id);
                $('input[name="product_id"]').val(product_id);
                $('#qn-add-to-quote').trigger('click');
                $('vex-dialog-button-secondary').trigger('click');
                var cnt = 0;
                var interval_obj = setInterval(function () {
                    var $el = $(".vex-content .vex-dialog-form .vex-dialog-message");
                    if ($el.length) {
                        var text = $el.text();
                        $($el).text(text.replace('&amp;', '&').replace('1 of',''));
                        clearInterval(interval_obj);
                    }

                    cnt++;
                    if (cnt == 100)
                        clearInterval(interval_obj);
                }, 100);
            });
        });
    }
    //funtion seach
    $("#searchInput").keyup(function () {
        // //split the current value of searchInput
        // var data = this.value.split(" ");

        // //create a jquery object of the rows
        // var jo = $(".product_listing_quote").find(".item");

        // if (this.value == "") {
        //     jo.show();
        //     return;
        // }
        // //hide all the rows
        // jo.hide();

        // //Recusively filter the jquery object to get results.
        // jo.filter(function (i, v) {
        //     var $t = $(this).children('.detail h4');
        //     for (var d = 0; d < data.length; ++d) {
        //         if ($t.is(":contains('" + data[d] + "')")) {
        //             return true;
        //         }
        //     }
        //     return false;
        // })
        // //show the rows that match.
        // .show();

        var filter = this.value.toUpperCase();
        var txtValue;

        $(".product_listing_quote .item").each(function (index, value) {
            txtValue = $(this).children().children('h4').html();
            if ((txtValue.toUpperCase().indexOf(filter) > -1)) {
                $(this).show();
            } else {
                $(this).hide();
            }

        });


    }).focus(function () {
        // this.value = "";
        // $(this).css({
        //     "color": "black"
        // });
        // $(this).unbind('focus');
    });
    //Custom form quote 
    //create function custom input number
    function customInputNumber() {
        $('#qn-quote-form input[type=number]').attr("min", "0");
        if ($('.mui-textfield.qn-form-qty').find('.up').length == 0) {
            $('.mui-textfield.qn-form-qty').append("<span class='up'><i class='fas fa-chevron-up'></i></span>");
            $('.mui-textfield.qn-form-qty').append("<span class='down'><i class='fas fa-chevron-down'></i></span>");
            $('.mui-row.qn-product-row .mui-form--inline .mui-textfield.qn-form-qty').each(function () {
                var parent = $(this);
                var btnUp = parent.find('.up');
                var btnDown = parent.find('.down');
                var input = parent.find('input[type="number"]');
                btnUp.click(function () {

                    var oldValue = parseInt(input.val());
                    var newValue = oldValue + 1;
                    input.val(newValue);
                    input.trigger('input');
                    parent.next().removeClass("qn-product-delete");


                });
                btnDown.click(function () {

                    var oldValue = parseInt(input.val());
                    var newValue = oldValue - 1;
                    input.val(newValue);
                    input.trigger('change');
                    parent.next().removeClass("qn-product-delete");

                });
                input.on("change", function () {
                    var qty = parseInt($(this).val());
                    if (qty < 1) {
                        $(this).val('1');
                    } else if (Number.isNaN(qty)) {
                        $(this).val('1');
                    }

                });
            });
        }
        //console.log($('.mui-textfield.qn-form-qty').find('.up').length);


    }
    $(document).on("click", ".vex-content .vex-dialog-form .vex-dialog-buttons .vex-first", function () {

        var num = 0;
        var interval_obj = setInterval(function () {
                if ($("#qn-quote-form").length) {
                    $("#qn-customer-name").attr("name", "qn-customer-name");
                    $("#qn-customer-email").attr("name", "qn-customer-email");
                    var button = $("#qn-quote-form").find(':submit');
                    button.insertAfter("#qn-locality-fields");    

                    customInputNumber();
                    var array = [];
                    $('.mui-row.qn-product-row .mui-form--inline .mui-textfield.qn-form-qty').each(function () {


                        var parent = $(this);
                        var input = parent.find('input[type="number"]').val();
                        array.push(input);
                    });

                    $(document).on('click', ".qn-form-button.mui-btn.mui-btn--raised.mui-btn--primary", function () {

                        //console.log(JSON.stringify(array));
                        var check = 0;
                        var arrayNumberAfter = [];
                        $('.mui-row.qn-product-row .mui-form--inline .mui-textfield.qn-form-qty').each(function () {
                            var parent = $(this);
                            var input = parent.find('input[type="number"]').val();
                            arrayNumberAfter.push(input);


                        });
                        //console.log(arrayNumberAfter);

                        var interval_obj = setInterval(function () {
                                customInputNumber();
                                check++;
                                //console.log(check);
                                if (check == 300) {
                                    // customInputNumber();
                                    clearInterval(interval_obj);
                                }

                            },
                            100);


                    });
                    //validate form
                    // Validate field State in page add address
                    // $.validator.addMethod('minStrict', function (value, el, param) {
                    //     return value > param;
                    // });


                    // $("#qn-quote-form").validate({
                    //     rules: {
                    //         "qn-customer-name": {
                    //             required: true,
                    //         },
                    //         "qn-customer-email": {
                    //             required: true,
                    //         }
                    //     },
                    //     messages: {
                    //         "qn-customer-name": {
                    //             required: "You must enter name"
                    //         },
                    //         "qn-customer-email": {
                    //             required: "You must enter email"
                    //         }
                    //     }

                    // });
                    // $(".mui--text-right.mui--is-not-empty").rules("add", {
                    //     required: true,
                    //     minStrict: 13,
                    //     number: true
                    // });
                    clearInterval(interval_obj);
                }

                num++;
                if (num == 100) {
                    clearInterval(interval_obj);
                }
            },
            100);
    });

    //end requote custom
    //Popup support
    $(".support-trigger-custom").on("click",function(event){
        event.preventDefault();
        $(".olark-launch-button.olark-chat-tab.olark-size-md").trigger("click");
    });
    if ($(window).width() < 800) {
        $('.tab-title').not( ".is-active" ).click(function () {
            let self = $(this);
            $('html, body').animate({
                scrollTop:  $('.productView-description ul.tabs').offset().top,
            }, 300)
        
        })
    }   
    if ($(window).width() < 767) {
        if ($('.cms_1 ul').length) {
            $('.cms_1 ul').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                prevArrow: '<button class="fal fa-chevron-left"></button>',
                nextArrow: '<button class="fal fa-chevron-right"></i></button>',
                // responsive: [{
                //     "breakpoint": 767,
                //     "settings": {
                //         "slidesToShow": 1,
                //         "slidesToScroll": 1
                //     }
                // }]
            });
        }
       
    }


});
jQuery(window).on('resize', function() {
    var viewportWidth = jQuery(window).width();
    if ($('.cms_1 ul').length) {
        if (viewportWidth < 767) {
            $('.cms_1 ul').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                prevArrow: '<button class="fal fa-chevron-left"></button>',
                nextArrow: '<button class="fal fa-chevron-right"></i></button>',
                responsive: [{
                    "breakpoint": 767,
                    "settings": {
                        "slidesToShow": 1,
                        "slidesToScroll": 1
                    }
                }]
            });
        } else {
            $('.cms_1 ul').slick('unslick');
        }
    }
});
