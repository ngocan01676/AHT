import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';

export const CartPreviewEvents = {
    close: 'closed.fndtn.dropdown',
    open: 'opened.fndtn.dropdown',
};

export default function (secureBaseUrl, cartId) {
    const loadingClass = 'is-loading';
    const $cart = $('[data-cart-preview]');
    const $cartDropdown = $('#cart-preview-dropdown');
    const $cartLoading = $('<div class="loadingOverlay"></div>');

    const $body = $('body');

    $body.on('cart-quantity-update', (event, quantity) => {
        if ($(window).width() > 920) {
            $('.cart-quantity').text('(' + quantity + ')').toggleClass('countPill--positive', quantity > 0);
        } else {
            $('.cart-quantity').text(quantity).toggleClass('countPill--positive', quantity > 0);
        }
        // if (quantity < 4) {
        //     $('.navUser-item--cart .dropdown-menu .previewCart').removeClass('item');
        // } else {
        //     $('.navUser-item--cart .dropdown-menu .previewCart').addBack('item');
        // }
        if (utils.tools.storage.localStorageAvailable()) {
            localStorage.setItem('cart-quantity', quantity);
        }
    });

    $cart.on('click', event => {
        const options = {
            template: 'common/cart-preview',
        };

        // Redirect to full cart page
        //
        // https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
        // In summary, we recommend looking for the string 'Mobi' anywhere in the User Agent to detect a mobile device.
        // if (/Mobi/i.test(navigator.userAgent)) {
        //     return event.stopPropagation();
        // }

        event.preventDefault();

        $cartDropdown
            .addClass(loadingClass)
            .html($cartLoading);
        $cartLoading
            .show();

        utils.api.cart.getContent(options, (err, response) => {
            $cartDropdown
                .removeClass(loadingClass)
                .html(response);
            $cartLoading
                .hide();
            removeProductCartPreview(options);
        });
    });
    //REMOVE PRODUCT IN CARTPREVIEW
    function removeProductCartPreview (options) {
        $('.minicart-remove-btn').click(function(e) {
            e.preventDefault();
            var itemId = $(this).data('id');
            $cartDropdown
                .addClass(loadingClass)
                .html($cartLoading);
            $cartLoading
                .show();
            utils.api.cart.itemUpdate(itemId, 0, (err, response) => {
                if (response.data.status === 'succeed') {
                    utils.api.cart.getContent(options, (err, response) => {
                        if ($('body.cart').length) {
                            window.location.reload();
                        } else {
                            var quantity = $(response).filter(".previewCart").first().data('quantity');
                            $('body').trigger('cart-quantity-update', quantity);
                            $cartDropdown.removeClass(loadingClass).html(response);
                            $cartLoading.hide();
                            removeProductCartPreview(options);
                        }
                    });
                } else {
                    swal({
                        text: response.data.errors.join('\n'),
                        type: 'error',
                    });
                }
            });
        });
    }
    let quantity = 0;

    if (cartId) {
        // Get existing quantity from localStorage if found
        if (utils.tools.storage.localStorageAvailable()) {
            if (localStorage.getItem('cart-quantity')) {
                quantity = Number(localStorage.getItem('cart-quantity'));
                $body.trigger('cart-quantity-update', quantity);
            }
        }

        // Get updated cart quantity from the Cart API
        const cartQtyPromise = new Promise((resolve, reject) => {
            utils.api.cart.getCartQuantity({ baseUrl: secureBaseUrl, cartId }, (err, qty) => {
                if (err) {
                    reject(err);
                }
                resolve(qty);
            });
        });

        // If the Cart API gives us a different quantity number, update it
        cartQtyPromise.then(qty => {
            quantity = qty;
            $body.trigger('cart-quantity-update', quantity);
        });
    } else {
        $body.trigger('cart-quantity-update', quantity);
    }
}