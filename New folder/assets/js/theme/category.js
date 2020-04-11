import { hooks } from '@bigcommerce/stencil-utils';
import utils from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import ProductDetails from './common/product-details';
import modalFactory, { showAlertModal } from './global/modal';
import FacetedSearch from './common/faceted-search';

export default class Category extends CatalogPage {
    onReady() {
        compareProducts(this.context.urls);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }
        setTimeout(function () { 
            const getcustomlink2 = $('#cate-video').attr('href');
            $('#cate-play-video').attr("href", getcustomlink2);
        },1000);

        var previewModal = modalFactory('#previewModal')[0];
        $('body').on('click', '.card-list-right .action-product .btn-card-list', event => {
            event.preventDefault();

            const productId = $(event.currentTarget).data('productid');
            const quantity = 1;
            var formData = new FormData();
            formData.append('action','add');
            formData.append('product_id',productId);
            formData.append('qty',quantity);
            

            utils.api.cart.itemAdd(formData, (err, response) => {
                const errorMessage = err || response.data.error;


                // Guard statement
                if (errorMessage) {
                    // Strip the HTML from the error message
                    const tmp = document.createElement('DIV');
                    tmp.innerHTML = errorMessage;

                    return showAlertModal(tmp.textContent || tmp.innerText);
                }

                // Open preview modal and update content
                if (previewModal) {
                    previewModal.open();
                    this.updateCartContent(previewModal, response.data.cart_item.id);
                } else {
                    // if no modal, redirect to the cart page
                    this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
                }
            });

        });
        $(document).on('click', '.productGrid .product .card-body .add-cart-home',(e) => {
            e.preventDefault();
            const productId = $(e.currentTarget).data('productid');
            // console.log(productId)
            const quantity = 1;
            var formData = new FormData();
            formData.append('action','add');
            formData.append('product_id',productId);
            formData.append('qty',quantity);
            

            utils.api.cart.itemAdd(formData, (err, response) => {
                const errorMessage = err || response.data.error;


                // Guard statement
                if (errorMessage) {
                    // Strip the HTML from the error message
                    const tmp = document.createElement('DIV');
                    tmp.innerHTML = errorMessage;

                    return showAlertModal(tmp.textContent || tmp.innerText);
                }

                // Open preview modal and update content
                if (previewModal) {
                    previewModal.open();
                    this.updateCartContent(previewModal, response.data.cart_item.id);
                } else {
                    // if no modal, redirect to the cart page
                    this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
                }
            });

        });
        
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');
            $('.page-sidebar .showing-products span').each(function(e) {
                var titlenew = $(this).text();
                $('.cate-sortby .showing-products span').text(titlenew);
                $('.showing-products.visible-mobile span').text(titlenew);
            });
            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }
    updateCartContent(modal, cartItemId, onComplete) {
        this.getCartContent(cartItemId, (err, response) => {
            if (err) {
                return;
            }

            modal.updateContent(response);

            // Update cart counter
            const $body = $('body');
            const $cartQuantity = $('[data-cart-quantity]', modal.$content);
            const $cartCounter = $('.navUser-action .cart-count');
            const quantity = $cartQuantity.data('cartQuantity') || 0;

            $cartCounter.addClass('cart-count--positive');
            $body.trigger('cart-quantity-update', quantity);

            if (onComplete) {
                onComplete(response);
            }
        });
    }
    getCartContent(cartItemId, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemId,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };

        utils.api.cart.getContent(options, onComplete);
    }
}
