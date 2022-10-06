import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To BaKasha',
    description: 'Chúng tôi bán những cuốn sách hay nhất với giá rẻ',
    keywords: 'books, buy books, cheap books',
}

export default Meta
