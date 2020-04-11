/*
 Import all product specific js
 */
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';
import utils from '@bigcommerce/stencil-utils';
export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    }

    onReady() {

        //fetch side bar
        if ($('#side_bar_product').length) {
            utils.api.getPage('/side-bar-product/', { template: 'page/default' }, (err, response) => {
                $('#side_bar_product').html(response);
            });
        }
        //js hieght
        if ($('.similar-product').length) {
            let height_max = 0;
            $('.similar-product .card-body-title').each(function (){
                if(height_max <  $(this).height()){
                    height_max = $(this).height();
                }    
            });

            $('.similar-product .card-body-title').each(function (){
                $(this).css('min-height',height_max);
            });
        }
        
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();
        this.bulkPricingHandler();  

    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf('#bulk_pricing') !== -1) {
            this.$bulkPricingLink.trigger('click');
        }
    }
    onResize() {
        //js hieght
        if ($('.similar-product').length) {
            let height_max = 0;
             $('.similar-product .card-body-title').each(function (){
                if(height_max <  $(this).height()){
                    height_max = $(this).height();
                }    
            });

            $('.similar-product .card-body-title').each(function (){
                $(this).css('min-height',height_max);
            });
        }
    }
}
