import React from 'react'
import Link from 'next/link'

class CategoryList extends React.Component {

    renderCategories(categories) {

        return categories.map(category => 
            (                
                <li key={category.id}>
                    <Link href={`/category/${ category.slug }`} as={ `/category/${ category.slug }` }>
                        <a className="dropdown-item">{ category.name }</a>
                    </Link>
                </li>
            )
        )
    }

    render() {
        
        const {categories} = this.props

        return (
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                { this.renderCategories(categories) }
            
            </ul>
        )

    }
}

export default CategoryList