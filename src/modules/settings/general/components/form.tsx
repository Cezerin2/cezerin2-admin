import {
  Divider,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import { Link } from "@reach/router"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import data from "../../../../lib/data"
import messages from "../../../../lib/text"
import { CustomToggle } from "../../../../modules/shared/form"
import style from "./style.css"

const GeneralSettings = (
  props: Readonly<{ handleSubmit; pristine; submitting; initialValues; onLoad }>
) => {
  const { handleSubmit, pristine, submitting, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const currencyItems = []
  for (const key in data.currencies) {
    currencyItems.push(
      <MenuItem
        value={key}
        key={key}
      >{`${key} - ${data.currencies[key]}`}</MenuItem>
    )
  }

  const taxItems = []
  for (const key in data.taxs) {
    taxItems.push(
      <MenuItem value={key} key={key}>{`${key} - ${data.taxs[key]}`}</MenuItem>
    )
  }

  const timezoneItems = []
  for (const key in data.timezones) {
    const { utc } = data.timezones[key]
    const utcPretty = `${utc.slice(0, -2)}:${utc.slice(-2)}`
    timezoneItems.push(
      <MenuItem value={key} key={key}>{`(UTC${utcPretty}) ${key}`}</MenuItem>
    )
  }

  const countryItems = []
  for (const key in data.countries) {
    countryItems.push(
      <MenuItem value={key} key={key}>
        {data.countries[key]}
      </MenuItem>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <Paper className="paper-box" elevation={1}>
        <div className={style.innerBox}>
          <div style={{ width: "100%" }}>
            <List>
              <Link
                to="/settings/general/logo"
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  rightIcon={<KeyboardArrowRight className="material-icons" />}
                >
                  {messages.logo}
                </ListItem>
              </Link>
              <Divider />
            </List>
          </div>

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_storeName}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field component={TextField} fullWidth name="store_name" />
            </div>
          </div>

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">{messages.currency}</div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={Select}
                autoWidth
                fullWidth
                name="currency_code"
              >
                {currencyItems}
              </Field>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_currencyFormatting}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="currency_format"
                floatingLabelText={messages.settings_currencyFormatting}
              />

              <Field
                component={TextField}
                fullWidth
                name="currency_symbol"
                floatingLabelText={messages.settings_currencySymbol}
              />

              <Field
                component={Select}
                autoWidth
                floatingLabelFixed
                fullWidth
                name="thousand_separator"
                floatingLabelText={messages.settings_thousandSeparator}
              >
                <MenuItem value=".">5.000.000</MenuItem>
                <MenuItem value=",">5,000,000</MenuItem>
                <MenuItem value=" ">5 000 000</MenuItem>
                <MenuItem value="">5000000</MenuItem>
              </Field>

              <Field
                component={Select}
                autoWidth
                fullWidth
                name="decimal_separator"
                floatingLabelText={messages.settings_decimalSeparator}
              >
                <MenuItem value=".">100.00</MenuItem>
                <MenuItem value=",">100,00</MenuItem>
              </Field>

              <Field
                component={Select}
                autoWidth
                fullWidth
                name="decimal_number"
                floatingLabelText={messages.settings_numberOfDecimal}
              >
                <MenuItem value={0}>100</MenuItem>
                <MenuItem value={1}>100.0</MenuItem>
                <MenuItem value={2}>100.00</MenuItem>
                <MenuItem value={3}>100.000</MenuItem>
                <MenuItem value={4}>100.000</MenuItem>
              </Field>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <Field
            component={CustomToggle}
            name="tax_included"
            label={messages.settings_taxIncluded}
            style={{ paddingTop: 16, paddingBottom: 16 }}
          />

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_taxRate}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="tax_rate"
                type="number"
                placeholder="0"
              />
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_timezone}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field component={Select} autoWidth fullWidth name="timezone">
                {timezoneItems}
              </Field>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_dateFormat}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field component={Select} autoWidth fullWidth name="date_format">
                <MenuItem value="MMMM D, YYYY">January 30, 2017</MenuItem>
                <MenuItem value="D MMMM YYYY">30 January 2017</MenuItem>
                <MenuItem value="YYYY-MM-DD">2017-01-30</MenuItem>
                <MenuItem value="YYYY-M-D">2017-1-30</MenuItem>
                <MenuItem value="MM/DD/YYYY">01/30/2017</MenuItem>
                <MenuItem value="MM.DD.YYYY">01.30.2017</MenuItem>
                <MenuItem value="DD/MM/YYYY">30/01/2017</MenuItem>
                <MenuItem value="DD.MM.YYYY">30.01.2017</MenuItem>
              </Field>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_timeFormat}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field component={Select} autoWidth fullWidth name="time_format">
                <MenuItem value="h:mm a">2:30 pm</MenuItem>
                <MenuItem value="h:mm A">2:30 PM</MenuItem>
                <MenuItem value="HH:mm">14:30</MenuItem>
              </Field>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_weightUnit}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field component={Select} autoWidth fullWidth name="weight_unit">
                <MenuItem value="g">{`${messages.settings_gram} (g)`}</MenuItem>
                <MenuItem value="kg">{`${messages.settings_kilogram} (kg)`}</MenuItem>
                <MenuItem value="lb">{`${messages.settings_pound} (lb)`}</MenuItem>
                <MenuItem value="oz">{`${messages.settings_ounce} (oz)`}</MenuItem>
              </Field>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_lengthUnit}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field component={Select} autoWidth fullWidth name="length_unit">
                <MenuItem value="cm">{`${messages.settings_centimeter} (cm)`}</MenuItem>
                <MenuItem value="in">{`${messages.settings_inch} (in)`}</MenuItem>
              </Field>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_defaultProductSorting}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="default_product_sorting"
                placeholder="-position,stock_status,price"
              />
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">{messages.productFields}</div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="product_fields"
                placeholder="id,path,name,price, ..."
              />
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">{messages.productsLimit}</div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="products_limit"
                type="number"
                placeholder="30"
              />
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_defaultShippingCountry}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={Select}
                autoWidth
                fullWidth
                name="default_shipping_country"
              >
                {countryItems}
              </Field>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_defaultShippingState}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="default_shipping_state"
              />
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.settings_defaultShippingCity}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="default_shipping_city"
              />
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <Field
            component={CustomToggle}
            name="hide_billing_address"
            label={messages.hideBillingAddress}
            style={{ paddingTop: 16, paddingBottom: 16 }}
          />

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">{messages.domain}</div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="domain"
                placeholder="https://domain.com"
              />
            </div>
          </div>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-12 col-sm-6">
              {messages.orderEmailCopyTo}
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                component={TextField}
                fullWidth
                name="order_confirmation_copy_to"
              />
            </div>
          </div>
        </div>
        <div className="buttons-box">
          <RaisedButton
            type="submit"
            label={messages.save}
            primary
            className={style.button}
            disabled={pristine || submitting}
          />
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "GeneralSettingsForm",
  enableReinitialize: true,
})(GeneralSettings)
