import mock from './mock'

/* eslint-disable import/extensions */

// import './authors'
// import './articles'
// import './categories'

/* eslint-enable import/extensions */

mock.onAny().passThrough() // forwards the matched request over network
