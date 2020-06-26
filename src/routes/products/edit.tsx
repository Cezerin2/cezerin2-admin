import { Router } from "@reach/router"
import React from "react"
import ProductEdit from "../../modules/products/edit"
import ProductOption from "../../modules/products/edit/option"

const ProductDetails = () => (
  <div className="row row--no-gutter col-full-height scroll">
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
      <Router>
        <ProductEdit path="/product/:productId" />
        <ProductOption path="/product/:productId/option/:optionId" />
      </Router>
    </div>
  </div>
)

export default ProductDetails
