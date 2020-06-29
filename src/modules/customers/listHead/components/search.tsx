import { TextField } from "@material-ui/core"
import React from "react"
import messages from "../../../../lib/text"

const Search = ({
  value,
  setSearch,
}: {
  value: string
  setSearch: Function
}) => (
  <TextField
    value={value}
    onChange={(e, v) => setSearch(v)}
    hintText={messages.customers_search}
    underlineShow={false}
    className="searchField"
    hintStyle={{ color: "rgba(255,255,255,0.4)", textIndent: "16px" }}
    inputStyle={{
      color: "#fff",
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: "4px",
      textIndent: "16px",
    }}
  />
)

export default Search
