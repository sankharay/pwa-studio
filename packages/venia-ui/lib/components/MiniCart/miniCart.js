import React from 'react';
import { bool, shape, string } from 'prop-types';

import { useScrollLock } from '@magento/peregrine';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import ProductListing from './ProductListing';

import ShoppingBadOperations from './miniCart.gql';

import defaultClasses from './miniCart.css';

const Error = () => {
    return <div>TBD</div>;
};

/**
 * The MiniCart component shows a limited view of the user's cart.
 *
 * @param {Boolean} props.isOpen - Whether or not the MiniCart should be displayed.
 */
const MiniCart = React.forwardRef((props, ref) => {
    const { isOpen } = props;

    // Prevent the page from scrolling in the background
    // when the MiniCart is open.
    useScrollLock(isOpen);

    const talonProps = useMiniCart({
        ...ShoppingBadOperations
    });

    const {
        productListings,
        loading,
        error,
        totalQuantity,
        handleRemoveItem
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isOpen ? classes.root_open : classes.root;
    const contentsClass = isOpen ? classes.contents_open : classes.contents;

    if (error) {
        return <Error error={error} />;
    }

    return (
        <aside className={rootClass}>
            {/* The Contents. */}
            <div ref={ref} className={contentsClass}>
                <div
                    className={classes.header}
                >{`Header TBD total quantity: ${totalQuantity}`}</div>
                <div className={classes.body}>
                    <ProductListing
                        listings={productListings}
                        loading={loading}
                        handleRemoveItem={handleRemoveItem}
                    />
                </div>
                <div className={classes.footer}>Footer TBD</div>
            </div>
        </aside>
    );
});

export default MiniCart;

MiniCart.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        contents: string,
        contents_open: string,
        header: string,
        body: string,
        footer: string
    }),
    isOpen: bool
};
