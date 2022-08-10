import { Fragment } from "react"
import TopNavigation from "../components/common/top-navigation/TopNavigation"


const Root = ({ children} ) => {
  return (
    <Fragment>
        <TopNavigation />
        { children }
    </Fragment>
  )
}

export default Root