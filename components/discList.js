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
                <div className="col-lg-3 col-md-4 mb-4" key={disc.id}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h4 className="card-title">
                                <Link href={`/disc/${ disc.slug }`} as={`/disc/${ disc.slug }`}>
                                    <a>{disc.name}</a>
                                </Link>
                            </h4>
                            <div><small>{disc.disc_format.name} - {disc.category.name}</small></div>
                            <div><small>{disc.studio.name}</small></div>
                            <div className="disc_cover_image_block">
                              <Link href={`/disc/${ disc.slug }`} as={`/disc/${ disc.slug }`}>
                                  <a><img className="card-img-top disc_cover_image" src={"http://disc.local-test.com/uploads/" + disc.coverImage.path} alt="" /></a>
                              </Link>
                            </div>
                            <p className="card-text">{this.shortDescription(disc.description)}</p>
                        </div>
                        <div className="card-footer">
                            {/* <small className="text-muted">{disc.rating}</small> */}
                            <small className="text-muted">${disc.price}</small>
                            <Link href={`/disc/${ disc.slug }`} as={`/disc/${ disc.slug }`}>
                              <a className="add-to-cart float-end">add to cart</a>
                            </Link>                            
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