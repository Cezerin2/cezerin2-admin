import { Button, Paper } from "@material-ui/core"
import React, { useEffect, useRef, useState } from "react"
import api from "../../../../../lib/api"
import messages from "../../../../../lib/text"

const updateProductArray: { category_name: any; sub_category_name: any; draft: {} }[] = []
const categoryIdArray = []
const imageFilesArray: { id: any; url: any }[] = []

//const API = 'https://sheets.googleapis.com/v4/spreadsheets/1eEa-9dERtjug9rGAycjDjA7L2imu-53-44kkqrmro9c/values:batchGet?ranges=basedata&majorDimension=ROWS&key=AIzaSyCPK118zWL9Qqhl8Lsa3yQoo6YeccpoDKM';

/**
 * Google Spreadsheet product import mapping
 *
 * @class modules:products/edit~ProductImport
 * @extends React.Component
 */
const ProductImport = (props: Readonly<{}>) => {
  const [productItems, setProductItems] = useState([])
  const [deleteCounter, setDeleteCounter] = useState(1)
  const [uploadedProducts, setUploadedProducts] = useState(0)
  const [errors, setErrors] = useState(0)
  const [dashboardsettings, setDashboardsettings] = useState(true)

  const loader = useRef()

  const { files } = props

  // Fetch all products and productimages if exists and set ready to remove it
  const fetchData = () => {
    loader.current.style.setProperty("display", "inline-block")
    const filter = {
      fields:
        "id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,url",
    }

    const { json } = api.products.list(filter)
    try {
      // db has no products saved
      if (json.data.length < 1) {
        uploadProducts()
        for (let i in json.data) {
          deleteProducts(json.data[i].id, json.data.length)
          if (json.data[i].images.length > 0) {
            api.products.images.delete(
              json.data[i].id,
              json.data[i].images[0].id
            )
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  // remove all products from db
  function deleteProducts(id: any, arrayLength: string) {
    api.products.delete(id).then(() => {
      if (parseInt(deleteCounter) === parseInt(arrayLength)) {
        uploadProducts() //upload just once
      }
      setDeleteCounter(deleteCounter + 1)
    })
  }

  // Prepare product draft for uploading
  function uploadProducts() {
    let productDraft = {}
    const statusCell = document.getElementsByClassName("sheet-cell-state")
    let errorsCounter = errors

    for (let i = 1; i < product_items.length; i++) {
      productDraft = {
        enabled: true,
        category_id: null,
        category_ids: [],
        category_name: null, //'5b8903f864300c8663503ad6',
        stock_quantity: null,
        regular_price: null,
        name: null,
        sku: null,
        path: null,
      }
      if (product_items[i] !== undefined) {
        productDraft.category_name = product_items[i]["category_name"]
        productDraft.sub_category_name = product_items[i]["sub_category_name"]
        productDraft.name = product_items[i]["name"]
        productDraft.stock_quantity = product_items[i]["stock_quantity"]
        productDraft.regular_price = product_items[i]["regular_price"]
        productDraft.enabled = product_items[i]["enabled"]
        productDraft.sku = product_items[i]["sku"]
        productDraft.path = product_items[i]["images"]

        if (
          productDraft.category_name !== "" &&
          productDraft.name !== "" &&
          productDraft.stock_quantity !== "" &&
          productDraft.regular_price !== "" &&
          productDraft.sku !== "" &&
          productDraft.path !== ""
        ) {
          statusCell[i].innerHTML = "&#x2713;"
          statusCell[i].style.color = "green"
        } else {
          errorsCounter += 1
          setErrors(errorsCounter)
        }

        updateProductArray.push({
          category_name: productDraft.category_name,
          sub_category_name: productDraft.sub_category_name,
          draft: productDraft,
        })
        if (i === product_items.length - 1) {
          removeCategories()
        }
      } else {
        errorsCounter += 1
        setErrors(errorsCounter)
      }
    }
  }

  // Fetch all existing categories and remove it
  function removeCategories() {
    let catArray = []
    const { json } = api.productCategories.list()
    try {
      catArray = json
      json.forEach(function (element: { id: any }) {
        try {
          api.productCategories.delete(element.id)
          if (catArray.length <= 1) {
            recreateCategories()
          }
        } catch (error) {
          console.error(error)
        }
      })
    } catch (error) {
      console.error(error)
    }

    if (catArray.length < 1) {
      recreateCategories()
    }
  }

  // Create root categories
  function recreateCategories() {
    const catArray: any[] = []
    updateProductArray.forEach((pArrayItem, i) => {
      const { json } = api.productCategories.create({
        enabled: true,
        name: pArrayItem.category_name,
      })
      try {
        catArray.push(json)
        if (i === updateProductArray.length - 1) {
          removeCategoryDuplicates(catArray)
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  // Remove root category duplicates
  // @param {Array} catArray Category array
  function removeCategoryDuplicates(catArray: []) {
    let newCatArray = []
    newCatArray = Object.values(
      catArray.reduce(
        (acc, cur) =>
          Object.assign(acc, {
            [cur.name]: cur,
          }),
        {}
      )
    )
    catArray.forEach((item: {}) => {
      api.productCategories.delete(item.id)
    })

    newCatArray.forEach((item, i) => {
      try {
        api.productCategories.create({ enabled: true, name: item.name })
        if (i === newCatArray.length - 1) {
          getRootCategoryIds()
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  // Get all root category IDs
  function getRootCategoryIds() {
    const CATEGORIES_FIELDS = "name,id"
    const { json } = api.productCategories.list({
      enabled: true,
      fields: CATEGORIES_FIELDS,
    })
    try {
      updateProductArray.forEach((pArrayItem, i) => {
        json.forEach((jArrayItem: { name: any; id: any }) => {
          if (pArrayItem.category_name === jArrayItem.name) {
            categoryIdArray.push(jArrayItem.id)
          }
        })

        if (i === updateProductArray.length - 1) {
          setSubCategories()
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  // Set sub categories
  function setSubCategories() {
    const { json } = api.productCategories.list()
    try {
      json.forEach((item: { name: string; id: string }) => {
        updateProductArray.forEach((elem, j) => {
          if (item.name === elem.category_name) {
            elem.draft.category_name = elem.sub_category_name || item.name
            elem.draft.category_id = item.id

            if (elem.sub_category_name !== "") {
              const { json } = api.productCategories.create({
                enabled: true,
                name: elem.sub_category_name,
                parent_id: item.id,
              })
              try {
                elem.draft.category_id = json.id
                elem.draft.category_ids.push(json.id)
                if (j === updateProductArray.length - 1) {
                  updateProduct()
                }
              } catch (error) {
                console.error(error)
              }
            }
          }
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Update products to the categories
   *
   * @returns {Boolean} true if there is no products
   */
  function updateProduct() {
    /*let uniqProductArray = updateProductArray.reduce((unique, o) => {
			if(!unique.some(obj => obj.category_name === o.category_name)) {
			  unique.push(o);
			}
			return unique;
		},[]);*/

    updateProductArray.some((pArrayItem, i) => {
      if (pArrayItem === undefined) {
        return true
      }

      const { json } = api.products.create(pArrayItem.draft)
      try {
        imageFilesArray.push({
          id: json.id,
          url: pArrayItem.draft.path.split(","),
        })
        setDeleteCounter(0)
        setUploadedProducts(i + 1)

        if (i + 1 === product_items.length - 1) {
          loader.current.style.setProperty("display", "none")
          uploadImages()
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  /**
   * Upload product images
   *
   * @returns {undefined}
   */
  function uploadImages() {
    const { json } = api.files.list()
    try {
      imageFilesArray.forEach(aFile => {
        aFile.url.forEach((imageFile: string) => {
          json.forEach((jFile: { file: string }) => {
            if (imageFile === jFile.file) {
              let xhr = new XMLHttpRequest()
              xhr.open("GET", "/assets/" + jFile.file, true)
              xhr.responseType = "arraybuffer"
              var form = null

              xhr.onload = function (e) {
                // Obtain a blob: URL for the image data.
                var arrayBufferView = new Uint8Array(response)
                var blob = new Blob([arrayBufferView], { type: "image/jpeg" })
                var urlCreator = window.URL || window.webkitURL
                let imageUrl = urlCreator.createObjectURL(blob)

                let files = new File([blob], imageFile, { type: "image/jpeg" })
                files["preview"] = imageUrl

                form = new FormData()
                form.append("file", files)

                const { status } = api.products.images.upload(aFile.id, form)
                try {
                  console.log(status)
                } catch (error) {
                  console.error(error)
                }
              }
              xhr.send()
            }
          })
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    let spreadsheetApiCredentials = null
    document.getElementsByClassName("product-list")[0].style.display = "none"

    // fetch product import spreadsheet data from settings and set api credentials for google
    const { json } = api.settings.retrieveImportSettings()
    spreadsheetApiCredentials = `https://sheets.googleapis.com/v4/spreadsheets/${json.sheetid}/values:batchGet?ranges=${json.range}&majorDimension=ROWS&key=${json.apikey}`

    try {
      await fetch(spreadsheetApiCredentials)
      (      response: { json: () => any }) => response.json()
      const batchRowValues = data.valueRanges[0].values

      let counter = 0
      const rows = []
      for (let i = 0; i < batchRowValues.length; i++) {
        batchRowValues[i].unshift("No.")

        const rowObject = {}
        for (let j = 0; j < batchRowValues[i].length; j++) {
          if (i > 0) {
            batchRowValues[i][0] = counter
          }
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j]
        }
        counter++
        rows.push(rowObject)
      }

      setProductItems(rows)

      let status = document.getElementsByClassName("sheet-cell-state")
      ;[].slice.call(status).forEach((element, i) => {
        if (i === 0) {
          return
        }
        element.style.color = "red"
      })
    } catch (error) {
      console.error(error)
      setDashboardsettings(false)
    }
  }, [])

  let keyCounter = 0
  const listHeader = product_items.map((p: any[], j: number) => {
    if (j < 1) {
      return (
        <tr className="tr-header" key={keyCounter}>
          {Object.keys(p)
            .filter(k => k !== "id")
            .map((k, i) => {
              return (
                <th className="td-header" key={keyCounter + i}>
                  <div
                    ref="status"
                    className={
                      k === "state" ? "sheet-cell-state" : "sheet-cell-" + i
                    }
                    suppressContentEditableWarning="true"
                    key={p[i] + j + i + p[j]}
                    contentEditable="true"
                    value={k}
                    onInput={editColumn}
                  >
                    {p[k]}
                  </div>
                </th>
              )
            })}
        </tr>
      )
    }
    keyCounter++
  })

  const list = product_items.map((p: any[], j: number) => {
    if (j >= 1) {
      return (
        <tr className="tr-body" key={keyCounter + j}>
          {Object.keys(p)
            .filter(k => k !== "id")
            .map((k, i) => {
              return (
                <td className="td-body" key={keyCounter + i}>
                  <div
                    className={
                      k === "state" ? "sheet-cell-state" : "sheet-cell-" + i
                    }
                    suppressContentEditableWarning="true"
                    key={p[i] + j + i + p[j]}
                    contentEditable="true"
                    value={k}
                    onInput={editColumn}
                  >
                    {p[k]}
                  </div>
                </td>
              )
            })}
        </tr>
      )
    }
    keyCounter++
  })

  const tableStyle = {
    align: "center",
  }

  const showLoader = {
    display: "none",
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="spread-sheet-container" style={productsImport}>
          <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
            {messages.settings_googlesheet_header}
            <p>
              {" "}
              {messages.settings_googlesheet_products}{" "}
              {product_items.length - 1} /{" "}
              {messages.settings_googlesheet_uploaded} {uploadedProducts}
              {errors > 0
                ? "/ " + messages.settings_googlesheet_errors + " " + errors
                : ""}
              {errors > 0 ? errors : null}
              <h3 className="dashboardErrorResponse">
                {!dashboardsettings ? messages.missing_dashboardsettings : null}
              </h3>
              {!dashboardsettings ? messages.setup_google_spreadsheet : null}
              <span
                ref={loader}
                style={showLoader}
                className="loader loader-product-import"
              >
                <svg className="circular" viewBox="25 25 50 50">
                  <circle
                    className="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </svg>
              </span>
            </p>
          </div>
          <Paper className="paper-box" elevation={1}>
            <fieldset className="spread-sheet-table">
              <div className="schedule padd-lr">
                <div className="tbl-header">
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    id="mytable"
                    style={tableStyle}
                  >
                    <thead>{listHeader}</thead>
                  </table>
                </div>
                <div className="tbl-content">
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    id="mytable"
                    style={tableStyle}
                  >
                    <tbody>{list}</tbody>
                  </table>
                </div>
              </div>
            </fieldset>
            <div className="buttons-box">
              <Button
                files={files}
                color="primary"
                keyboardFocused={true}
                onClick={fetchData}
                className={"spread-sheet-save-btn"}
              >
                {messages.import}
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </>
  )
}

/*ProductImport.propTypes = {
	onStartImportProducts: PropTypes.func.isRequired
}*/

export default ProductImport
