import api from "../../lib/api";
import moment from "moment";
import * as t from "./actionTypes";

function requestProduct() {
  return {
    type: t.PRODUCT_DETAIL_REQUEST
  };
}

function receiveProduct(item) {
  return {
    type: t.PRODUCT_DETAIL_RECEIVE,
    item
  };
}

function receiveProductError(error) {
  return {
    type: t.PRODUCT_DETAIL_FAILURE,
    error
  };
}

function receiveImages(images) {
  return {
    type: t.PRODUCT_IMAGES_RECEIVE,
    images
  };
}

function receiveVariants(variants) {
  return {
    type: t.PRODUCT_VARIANTS_RECEIVE,
    variants
  };
}

function receiveOptions(options) {
  return {
    type: t.PRODUCT_OPTIONS_RECEIVE,
    options
  };
}

export function cancelProductEdit() {
  return {
    type: t.PRODUCT_DETAIL_ERASE
  };
}

function requestProducts() {
  return {
    type: t.PRODUCTS_REQUEST
  };
}

function requestMoreProducts() {
  return {
    type: t.PRODUCTS_MORE_REQUEST
  };
}

function receiveProductsMore({ has_more, total_count, data }) {
  return {
    type: t.PRODUCTS_MORE_RECEIVE,
    has_more,
    total_count,
    data
  };
}

function receiveProducts({ has_more, total_count, data }) {
  return {
    type: t.PRODUCTS_RECEIVE,
    has_more,
    total_count,
    data
  };
}

function receiveProductsError(error) {
  return {
    type: t.PRODUCTS_FAILURE,
    error
  };
}

export function selectProduct(id) {
  return {
    type: t.PRODUCTS_SELECT,
    productId: id
  };
}

export function deselectProduct(id) {
  return {
    type: t.PRODUCTS_DESELECT,
    productId: id
  };
}

export function deselectAllProduct() {
  return {
    type: t.PRODUCTS_DESELECT_ALL
  };
}

export function selectAllProduct() {
  return {
    type: t.PRODUCTS_SELECT_ALL
  };
}

export function setFilter(filter) {
  return {
    type: t.PRODUCTS_SET_FILTER,
    filter
  };
}

function deleteProductsSuccess() {
  return {
    type: t.PRODUCT_DELETE_SUCCESS
  };
}

function setCategorySuccess() {
  return {
    type: t.PRODUCT_SET_CATEGORY_SUCCESS
  };
}

function requestUpdateProduct() {
  return {
    type: t.PRODUCT_UPDATE_REQUEST
  };
}

function receiveUpdateProduct(item) {
  return {
    type: t.PRODUCT_UPDATE_SUCCESS,
    item
  };
}

function errorUpdateProduct(error) {
  return {
    type: t.PRODUCT_UPDATE_FAILURE,
    error
  };
}

function successCreateProduct(id) {
  return {
    type: t.PRODUCT_CREATE_SUCCESS
  };
}

function imagesUploadStart() {
  return {
    type: t.PRODUCT_IMAGES_UPLOAD_START
  };
}

function imagesUploadEnd() {
  return {
    type: t.PRODUCT_IMAGES_UPLOAD_END
  };
}

const getFilter = (state, offset = 0) => {
  const searchTerm = state.products.filter.search;
  const sortOrder = searchTerm && searchTerm.length > 0 ? "search" : "name";

  const filter = {
    limit: 50,
    fields:
      "id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,url",
    search: searchTerm,
    offset,
    sort: sortOrder
  };

  if (
    state.productCategories.selectedId !== null &&
    state.productCategories.selectedId !== "all"
  ) {
    const filtercategory_id = state.productCategories.selectedId;
  }

  if (state.products.filter.stockStatus !== null) {
    const filterstock_status = state.products.filter.stockStatus;
  }

  if (state.products.filter.enabled !== null) {
    const filterenabled = state.products.filter.enabled;
  }

  if (state.products.filter.discontinued !== null) {
    const filterdiscontinued = state.products.filter.discontinued;
  }

  if (state.products.filter.onSale !== null) {
    const filteron_sale = state.products.filter.onSale;
  }

  return filter;
};

export function fetchProducts() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.products.loadingItems) {
      // do nothing
    } else {
      dispatch(requestProducts());
      dispatch(deselectAllProduct());

      const filter = getFilter(state);

      return api.products
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveProducts(json));
        })
        .catch(error => {
          dispatch(receiveProductsError(error));
        });
    }
  };
}

export function fetchMoreProducts() {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.products.loadingItems) {
      dispatch(requestMoreProducts());

      const offset = state.products.items.length;
      const filter = getFilter(state, offset);

      return api.products
        .list(filter)
        .then(({ json }) => {
          dispatch(receiveProductsMore(json));
        })
        .catch(error => {
          dispatch(receiveProductsError(error));
        });
    }
  };
}

export function deleteCurrentProduct() {
  return getState => {
    const state = getState();
    const product = state.products.editProduct;
    if (product && product.id) {
      return api.products
        .delete(product.id)
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    }
  };
}

export function deleteProducts() {
  return (dispatch, getState) => {
    const state = getState();
    const promises = state.products.selected.map(productId =>
      api.products.delete(productId)
    );

    return Promise.all(promises)
      .then(() => {
        dispatch(deleteProductsSuccess());
        dispatch(deselectAllProduct());
        dispatch(fetchProducts());
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function setCategory(category_id) {
  return (dispatch, getState) => {
    const state = getState();
    const promises = state.products.selected.map(productId =>
      api.products.update(productId, { category_id })
    );

    return Promise.all(promises)
      .then(values => {
        dispatch(setCategorySuccess());
        dispatch(deselectAllProduct());
        dispatch(fetchProducts());
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function updateProduct(data) {
  return dispatch => {
    dispatch(requestUpdateProduct());

    return api.products
      .update(data.id, data)
      .then(({ status, json }) => {
        const product = fixProductData(json);
        dispatch(receiveUpdateProduct(product));
      })
      .catch(error => {
        dispatch(errorUpdateProduct(error));
      });
  };
}

export function createProduct(history) {
  return (dispatch, getState) => {
    const state = getState();

    const productDraft = {
      enabled: false,
      category_id: state.productCategories.selectedId
    };

    return api.products.create(productDraft).then(({ json }) => {
      dispatch(successCreateProduct(json.id));
      history.push(`/product/${json.id}`);
    });
  };
}

const fixProductData = product => {
  const saleFrom = moment(product.date_sale_from);
  const saleTo = moment(product.date_sale_to);
  const stockExpected = moment(product.date_stock_expected);

  product.date_sale_from = saleFrom.isValid() ? saleFrom.toDate() : null;
  product.date_sale_to = saleTo.isValid() ? saleTo.toDate() : null;
  product.date_stock_expected = stockExpected.isValid()
    ? stockExpected.toDate()
    : null;

  return product;
};

export function fetchProduct(id) {
  return dispatch => {
    dispatch(requestProduct());

    return api.products
      .retrieve(id)
      .then(({ json }) => {
        const product = fixProductData(json);
        dispatch(receiveProduct(product));
      })
      .catch(error => {
        dispatch(receiveProductError(error));
      });
  };
}

export function fetchImages(productId) {
  return dispatch =>
    api.products.images.list(productId).then(({ json }) => {
      dispatch(receiveImages(json));
    });
}

export function fetchOptions(productId) {
  return dispatch =>
    api.products.options.list(productId).then(({ json }) => {
      dispatch(receiveOptions(json));
    });
}

export function fetchVariants(productId) {
  return dispatch =>
    api.products.variants.list(productId).then(({ json }) => {
      dispatch(receiveVariants(json));
    });
}

export function createVariant(productId) {
  return (dispatch, getState) => {
    const state = getState();
    const {
      regular_price,
      stock_quantity,
      weight
    } = state.products.editProduct;
    const variant = {
      price: regular_price,
      stock_quantity,
      weight
    };

    return api.products.variants.create(productId, variant).then(({ json }) => {
      dispatch(receiveVariants(json));
    });
  };
}

export function updateVariant(productId, variantId, variant) {
  return dispatch =>
    api.products.variants
      .update(productId, variantId, variant)
      .then(({ json }) => {
        dispatch(receiveVariants(json));
      });
}

export function setVariantOption(productId, variantId, optionId, valueId) {
  return dispatch => {
    const option = { option_id: optionId, value_id: valueId };
    return api.products.variants
      .setOption(productId, variantId, option)
      .then(({ json }) => {
        dispatch(receiveVariants(json));
      });
  };
}

export function createOptionValue(productId, optionId, valueName) {
  return dispatch =>
    api.products.options.values
      .create(productId, optionId, { name: valueName })
      .then(({}) => {
        dispatch(fetchOptions(productId));
      });
}

export function createOption(productId, option) {
  return dispatch =>
    api.products.options.create(productId, option).then(({ json }) => {
      dispatch(receiveOptions(json));
    });
}

export function updateOptionValue(productId, optionId, valueId, valueName) {
  return dispatch =>
    api.products.options.values
      .update(productId, optionId, valueId, { name: valueName })
      .then(({}) => {
        dispatch(fetchOptions(productId));
      });
}

export function updateOption(productId, optionId, option) {
  return dispatch =>
    api.products.options
      .update(productId, optionId, option)
      .then(({ json }) => {
        dispatch(receiveOptions(json));
      });
}

export function deleteOptionValue(productId, optionId, valueId) {
  return dispatch =>
    api.products.options.values
      .delete(productId, optionId, valueId)
      .then(({}) => {
        dispatch(fetchOptions(productId));
      });
}

export function deleteOption(productId, optionId) {
  return dispatch =>
    api.products.options.delete(productId, optionId).then(({ json }) => {
      dispatch(receiveOptions(json));
    });
}

export function deleteVariant(productId, variantId) {
  return dispatch =>
    api.products.variants.delete(productId, variantId).then(({ json }) => {
      dispatch(receiveVariants(json));
    });
}

export function deleteImage(productId, imageId) {
  return dispatch =>
    api.products.images.delete(productId, imageId).then(({}) => {
      dispatch(fetchImages(productId));
    });
}

export function updateImage(productId, image) {
  return dispatch =>
    api.products.images.update(productId, image.id, image).then(() => {
      dispatch(fetchImages(productId));
    });
}

export function updateImages(productId, images) {
  return dispatch => {
    const promises = images.map(image =>
      api.products.images.update(productId, image.id, image)
    );

    return Promise.all(promises).then(() => {
      dispatch(fetchImages(productId));
    });
  };
}

export function uploadImages(productId, form) {
  return dispatch => {
    dispatch(imagesUploadStart());
    return api.products.images
      .upload(productId, form)
      .then(() => {
        dispatch(imagesUploadEnd());
        dispatch(fetchImages(productId));
      })
      .catch(() => {
        dispatch(imagesUploadEnd());
      });
  };
}
