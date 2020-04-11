import utils from '@bigcommerce/stencil-utils';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import modalFactory, { showAlertModal } from '../global/modal';
import ProductDetails from '../common/product-details';
import { defaultModal } from './modal';
import 'slick-carousel';

export default function (viewmessager) {
    //   var previewModal = modalFactory('#previewModal')[0];
    // const modal = defaultModal();

    // $('body').on('click', '.add-cart-home', event => {
    //     event.preventDefault();

    //     const productId = $(event.currentTarget).data('productId');
    //     const quantity = 1;

    //     var formData = new FormData();
    //     formData.append('action','add');
    //     formData.append('product_id',productId);
    //     formData.append('qty',quantity);
        

    //     utils.api.cart.itemAdd(formData, (err, response) => {
    //         const errorMessage = err || response.data.error;


    //         // Guard statement
    //         if (errorMessage) {
    //             // Strip the HTML from the error message
    //             const tmp = document.createElement('DIV');
    //             tmp.innerHTML = errorMessage;

    //             return showAlertModal(tmp.textContent || tmp.innerText);
    //         }

    //         // Open preview modal and update content
    //         if (previewModal) {
    //             previewModal.open();
    //             ProductDetails.updateCartContent(previewModal, response.data.cart_item.id);
    //         } else {
    //             // if no modal, redirect to the cart page
    //             ProductDetails.redirectTo(response.data.cart_item.cart_url || ProductDetails.context.urls.cart);
    //         }
    //     });

    // });
}
