import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={600}
        height={500}
        viewBox="0 0 800 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="20" y="65" rx="2" ry="2" width="450" height="400" />
        <rect x="500" y="100" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="135" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="170" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="205" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="240" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="275" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="310" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="345" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="380" rx="2" ry="2" width="340" height="15" />
        <rect x="500" y="415" rx="2" ry="2" width="340" height="15" />
    </ContentLoader>
)

export default MyLoader