import utils from '@bigcommerce/stencil-utils';
import $ from 'jquery'; 
import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import quickViewCategory from './global/quick-view-category';
import cartPreview from './global/cart-preview';
import compareProducts from './global/compare-products';
import privacyCookieNotification from './global/cookieNotification';
import maintenanceMode from './global/maintenanceMode';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import objectFitImages from './global/object-fit-polyfill';

export default class Global extends PageManager {
    onReady() {
        if($(".testimonial-banner-bottom").length)
        {
            utils.api.getPage('/review-horizontal/', { template: 'page/default' }, (err, response) => {
                $(".testimonial-banner-bottom").append(response);
                $('.whatusers .content').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    leftMargin: 20,
                    prevArrow: '<button class="fal fa-chevron-left"></button>',
                    nextArrow: '<button class="fal fa-chevron-right"></i></button>',
                    responsive: [{
                        "breakpoint": 767,
                        "settings": {
                            "slidesToShow": 1.15,
                            "slidesToScroll": 1
                        }
                    }]
                }); 
            });
        }
        if($(".testimonial-review-vertical").length){
            utils.api.getPage('/review-vertical/', { template: 'page/default' }, (err, response) => {
                $(".testimonial-review-vertical").append(response);
            });

        }
        cartPreview(this.context.secureBaseUrl, this.context.cartId);
        quickSearch();
        currencySelector();
        foundation($(document));
        quickView(this.context);
        quickViewCategory(this.viewmessager);
        carousel();
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        maintenanceMode(this.context.maintenanceMode);
        loadingProgressBar();
        svgInjector();
        objectFitImages();

                // var group_customer0 = ['TN-XXXXX-AG', 'TA-XXXXX-AG', 'TX-XXXXX-AG', 'TN-XXXXX-AE', 'TA-XXXXX-AE', 'TX-XXXXX-AE'];
        var group_basics = ['TN-WHB01-AO', 'TA-WHB01-AO', 'TX-WHB01-AO', 'TN-WHB01-AE', 'TA-WHB01-AE', 'TX-WHB01-AE'];
        var group_customizer = ['TN-WHU01-AO', 'TA-WHU01-AO', 'TX-WHU01-AO', 'TN-WHU01-AE', 'TA-WHU01-AE', 'TX-WHU01-AE'];
        var group_creator = ['TN-WHC01-AO', 'TA-WHC01-AO', 'TX-WHC01-AO', 'TN-WHC01-AE', 'TA-WHC01-AE', 'TX-WHC01-AE'];
        var group_digitizer1 = ['TN-WHD01-AO', 'TA-WHD01-AO', 'TX-WHD01-AO', 'TN-WHD01-AE', 'TA-WHD01-AE', 'TX-WHD01-AE'];
        var group_organizer = ['TN-WHO02-AO', 'TA-WHO02-AO', 'TX-WHO02-AO', 'TN-WHO02-AE', 'TA-WHO02-AE', 'TX-WHO02-AE'];
        var group_personalizer = ['TN-WHP02-AO', 'TA-WHP02-AO', 'TX-WHP02-AO', 'TN-WHP02-AE', 'TA-WHP02-AE', 'TX-WHP02-AE'];
        var group_composer = ['TN-WHS02-AO', 'TA-WHS02-AO', 'TX-WHS02-AO', 'TN-WHS02-AE', 'TA-WHS02-AE', 'TX-WHS02-AE'];
        var group_digitizer2 = ['TN-WHD02-AO', 'TA-WHD02-AO', 'TX-WHD02-AO', 'TN-WHD02-AE', 'TA-WHD02-AE', 'TX-WHD02-AE'];
        var group_cancelledflexpay = ['TN-CANCEL-AO', 'TA-CANCEL-AO', 'TX-CANCEL-AO', 'TN-CANCEL-AE', 'TA-CANCEL-AE', 'TX-CANCEL-AE'];
        var name_group_customer = $('#menu').data("test");
        if (group_basics.includes(name_group_customer)) {

        }




        var crosssellIds = this.context.themeSettings['owned-basics'];
        var saleProduct = this.context.themeSettings['owned-customizer'];
        if (crosssellIds != '') {
            function loadproduct(){
               var crosssellArr = crosssellIds.trim().split(",");
                for (var i=0; i<crosssellArr.length; i++) {
                    utils.api.product.getById(crosssellArr[i], { template: 'products/safe-product-in-home' }, (err, response) => {
                    $('.new-product-slider').append(response);
                });
                }
            }
            loadproduct();
            setTimeout(function(){
                $('.new-product-slider').slick({
                  infinite: false,
                  leftMargin:20,
                    dots: false,
                    mobileFirst: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    responsive: [
                        {
                            breakpoint: 800,
                            settings: {
                                "slidesToShow": 5,
                                "slidesToScroll": 5
                            }
                        },
                        {
                            breakpoint: 550,
                            settings: {
                                "slidesToShow": 3,
                                "slidesToScroll": 3
                            }
                        }
                    ]
                })
            }, 4000);
        }
        if (saleProduct != '') {
            function loadproduct(){
               var saleProducts = saleProduct.trim().split(",");
                for (var i=0; i<saleProducts.length; i++) {
                    utils.api.product.getById(saleProducts[i], { template: 'products/safe-product-in-home' }, (err, response) => {
                    $('.top_sellers').append(response);
                });
                }
            }
            loadproduct();
            setTimeout(function(){
                $('.top_sellers').slick({
                  infinite: false,
                  leftMargin:20,
                    dots: false,
                    mobileFirst: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    responsive: [
                        {
                            breakpoint: 800,
                            settings: {
                                "slidesToShow": 5,
                                "slidesToScroll": 5
                            }
                        },
                        {
                            breakpoint: 550,
                            settings: {
                                "slidesToShow": 3,
                                "slidesToScroll": 3
                            }
                        }
                    ]
                })
            }, 4000);
        }


        //blog js
        if ($(".tags_filter").length) {
            $("li.tag").each(function() {
                let k = '.' + $(this).attr('data-name') ;
                let m = 'li.tag'+ k;

                let numItems = '(' +$(m).length + ')';
                //update number items
                //console.log( $(this).find('.number_product'));
                $(this).find('.number_product').html(numItems);
                //remove dup tag
                $(this).siblings(k).remove();
                $('.tags_filter').removeClass('hide');
            });
            $(".filter_title").on('click', event => {
                $(event.currentTarget).next().toggle();
            });
        }
        // Begin Pagination Blog end Filter
        // first load blog page
        if ($(".line-content").length ) {
            if ($(".line-content").length > 6 ) {
                panigation($(".line-content").length);
            }  
        }
        //filter and reset panigation
        if ($(".blog_task_filter").length){
            $(".clean_blog").hide();
            $(".blog_task_filter").on('click', event => {
                let searchQuery =  $(event.currentTarget).attr('data-name');
                
                utils.api.search.search(searchQuery, { template: 'search/quick-results-custom' }, (err, response) => {
                    if (err) {
                        return false;
                    }
                    $(".clean_blog").show();
                    $(".filter_content").removeAttr('style');
                    $(event.currentTarget).addClass("active");
                    $(event.currentTarget).parent().siblings().children().removeClass("active");
                    $('.line-content').addClass("hide");
                    response = response.trim();
                    response = response.split("|");
                    //console.log(response);
                    let number = 0;
                    $('#blog_listing .blog-header a').each(function() {
                        for (let i = 0; i < response.length; i++){  
                           // response[0]= response[0].trim();
                            if ($(this).attr('href') == response[i]) {
                             
                                $(this).parents('.line-content').removeClass("hide");
                                number ++;
                            }
                        }
                    })
                    console.log('number'+ number);
                    if (number > 6 ) {
                        panigation(number);
                    }
                    else{
                        $(".line-content").removeAttr('style');
                        $("#pagin").empty();
                    }
                    $('html, body').animate({
                        scrollTop: 0,
                    }, 300);
                });
            })
        }
        function showPage(page) {
             //let page size 6
            let pageSize = 6;
            $(".line-content").not( '.hide' ).hide();
            $(".line-content").not( '.hide').each(function(n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                $(this).show();
            });        
        }
        function panigation(value){
            //let page size 6

            let pageSize = 6;
            let incremSlide = 1;
            let startPage = 0;
            let numberPage = 0;

            let pageCount =  value / pageSize;

            let totalSlidepPage = Math.floor(pageCount / incremSlide);
            //console.log("number product show: "+ value);
            $(".line-content").removeAttr('style');
            $("#pagin").empty();
            for(let i = 0 ; i<pageCount;i++){
                $("#pagin").append('<li class="pagination-item"><a  class="pagination-link" href="'+'#'+(i+1)+'">'+(i+1)+'</a></li> ');
                if(i>pageSize){
                   $("#pagin li").eq(i).hide();
                }
            } 
            
            let prev = $("<li/>").addClass("not pagination-item pagination-item--previous").append('<a class="pagination-link" href="#prev"><i class="far fa-chevron-left"></i></a>').click(function(){
                $('.pagination-item--current').prev().trigger('click');
            });

            prev.hide();

            let next = $("<li/>").addClass("not pagination-item pagination-item--next").append('<a class="pagination-link" href="#next"><i class="far fa-chevron-right"></i></a>').click(function(){
                $('.pagination-item--current').next().trigger('click'); 
            });

            $("#pagin").prepend(prev).append(next);

            $("#pagin li").first().addClass("pagination-item--current");
            showPage(1);
            $("#pagin li").not('.not').eq(0).addClass("pagination-item--current");

            $("#pagin li").not('.not').on( "click", function() {
                $("#pagin li").removeClass("pagination-item--current");
                $(this).addClass("pagination-item--current");
                $('.pagination-item--current').siblings().not('.not').hide();
                next.show(); 
                prev.show();
                if ($('.pagination-item--current').next().hasClass('not')) {
                    $('.pagination-item--current').next().hide();
                }
                else{
                    $('.pagination-item--current').next().show();
                }

                if ($('.pagination-item--current').prev().hasClass('not')) {
                    $('.pagination-item--current').prev().hide();
                }
                else{
                    $('.pagination-item--current').prev().show();
                }
                $('html, body').animate({
                    scrollTop: 0,
                }, 300);
                showPage(parseInt($(this).text()));
            });

            }
        }
    //End  Pagination Blog end Filter
    //End blog js
}
                
