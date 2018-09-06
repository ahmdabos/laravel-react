// import libs
import { connect } from "react-redux"

import React, {Component} from "react"

// import components
import Articles from "../../common/articles/listing/components/Articles"

class Page extends Component {

    render() {
        return <div>
            <Articles/>
        </div>
    }
}

export default connect()(Page)
