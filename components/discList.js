import React from 'react'
import Link from 'next/link'

class DiscList extends React.Component {

    shortDescription = (text) => {
        return (
            text.substr(0, 100) + '...'
        )
    }

    renderDiscs(discs) {

        return discs.map(disc => 
            (
                <div className="col-lg-4 col-md-6 mb-4" key={disc.id}>
                    <div className="card h-100">
                        <Link href={"discs/[id]"} as={"/discs/" + disc.id}>
                            <a><img className="card-img-top" src={disc.image} alt="" /></a>
                        </Link>
                        <div className="card-body">
                            <h4 className="card-title">
                                <Link href={"discs/[id]"} as={"/discs/" + disc.id}>
                                    <a>{disc.name}</a>
                                </Link>
                            </h4>
                            <h5>${disc.price}</h5>
                            <p className="card-text">{this.shortDescription(disc.description)}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">{disc.rating}</small>
                        </div>
                    </div>
                </div>
            )
        )
    }

    render() {
        
        const {discs} = this.props

        return (
            <React.Fragment>

                { this.renderDiscs(discs) }
            
            </React.Fragment>
        )

    }
}

export default DiscList