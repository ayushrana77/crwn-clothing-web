import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors.js'

import CollectionPreview from '../collection-preview/collection-preview'
import './collection-overview.style.scss'

const CollectionOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...othercollectionprops }) => (
      <CollectionPreview key={id} {...othercollectionprops} />
    ))}
  </div>
)
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
})

export default connect(mapStateToProps)(CollectionOverview)
