import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/* eslint-disable global-require */
const data = {
  categories: [
    {
      "id": "1",
      "title": "Sunday Review",
      "created_at": "2021-10-12 09:54:13.271261",
      "updated_at": "2021-10-12 09:54:13.271261"
    },
    {
      "id": "2",
      "title": "Health",
      "created_at": "2021-10-12 09:54:13.737133",
      "updated_at": "2021-10-12 09:54:13.737133"
    },
    {
      "id": "3",
      "title": "Opinion",
      "created_at": "2021-10-12 09:54:16.600003",
      "updated_at": "2021-10-12 09:54:16.600003"
    },
    {
      "id": "4",
      "title": "U.S.",
      "created_at": "2021-10-12 09:54:19.283497",
      "updated_at": "2021-10-12 09:54:19.283497"
    },
    {
      "id": "5",
      "title": "World",
      "created_at": "2021-10-12 09:54:21.930404",
      "updated_at": "2021-10-12 09:54:21.930404"
    },
    {
      "id": "6",
      "title": "Books",
      "created_at": "2021-10-12 09:54:22.766255",
      "updated_at": "2021-10-12 09:54:22.766255"
    },
    {
      "id": "7",
      "title": "Science",
      "created_at": "2021-10-12 09:54:22.989055",
      "updated_at": "2021-10-12 09:54:22.989055"
    },
    {
      "id": "8",
      "title": "Dining & Wine",
      "created_at": "2021-10-12 09:54:38.334931",
      "updated_at": "2021-10-12 09:54:38.334931"
    },
    {
      "id": "9",
      "title": "Business Day",
      "created_at": "2021-10-12 09:54:47.553247",
      "updated_at": "2021-10-12 09:54:47.553247"
    },
    {
      "id": "10",
      "title": "Travel",
      "created_at": "2021-10-12 09:54:54.198008",
      "updated_at": "2021-10-12 09:54:54.198008"
    },
    {
      "id": "11",
      "title": "Technology",
      "created_at": "2021-10-12 09:55:05.393478",
      "updated_at": "2021-10-12 09:55:05.393478"
    },
    {
      "id": "12",
      "title": "Sports",
      "created_at": "2021-10-12 09:55:06.555084",
      "updated_at": "2021-10-12 09:55:06.555084"
    },
    {
      "id": "13",
      "title": "Movies",
      "created_at": "2021-10-12 09:55:17.602149",
      "updated_at": "2021-10-12 09:55:17.602149"
    },
    {
      "id": "14",
      "title": "Magazine",
      "created_at": "2021-10-12 09:55:24.790364",
      "updated_at": "2021-10-12 09:55:24.790364"
    },
    {
      "id": "15",
      "title": "Home & Garden",
      "created_at": "2021-10-12 09:55:57.649171",
      "updated_at": "2021-10-12 09:55:57.649171"
    },
    {
      "id": "16",
      "title": "Arts",
      "created_at": "2021-10-12 09:56:14.082073",
      "updated_at": "2021-10-12 09:56:14.082073"
    },
    {
      "id": "17",
      "title": "Fashion & Style",
      "created_at": "2021-10-12 09:57:06.251790",
      "updated_at": "2021-10-12 09:57:06.251790"
    },
    {
      "id": "18",
      "title": "Your Money",
      "created_at": "2021-10-12 09:57:09.326117",
      "updated_at": "2021-10-12 09:57:09.326117"
    },
    {
      "id": "19",
      "title": "Education",
      "created_at": "2021-10-12 09:57:10.845537",
      "updated_at": "2021-10-12 09:57:10.845537"
    },
    {
      "id": "20",
      "title": "N.Y. / Region",
      "created_at": "2021-10-12 09:57:24.699038",
      "updated_at": "2021-10-12 09:57:24.699038"
    },
    /* {
      "id": "21",
      "title": "N.Y. / Region 2",
      "created_at": "2021-10-12 09:57:24.699038",
      "updated_at": "2021-10-12 09:57:24.699038"
    }, */
  ],
}
/* eslint-enable */

// ------------------------------------------------
// GET: Return categories
// ------------------------------------------------
mock.onGet('/api/categories').reply(async config => {
  // eslint-disable-next-line object-curly-newline
  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false,
  } = config.params
  /* eslint-enable */

  console.log('get /api/categories', perPage, page, q)
  await timeout(Math.floor(Math.random() * 2) * 1000)
  // await timeout(4 * 1000)

  const queryLowered = q.toLowerCase()
  const filteredData = data.categories.filter(
    category =>
      // eslint-disable-next-line
      category.title.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      categories: paginateArray(filteredData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// POST: Add new category
// ------------------------------------------------
mock.onPost('/api/categories').reply(config => {
  // Get event from post data
  const { category } = JSON.parse(config.data)
  console.log('post /api/categories', category)

  const { length } = data.categories
  let lastIndex = 0
  if (length) {
    lastIndex = data.categories[length - 1].id
  }
  category.id = lastIndex + 1
  category.created_at = new Date()
  category.updated_at = new Date()

  data.categories.push(category)

  return [201, { category }]
})

// ------------------------------------------------
// GET: Return Single category
// ------------------------------------------------
mock.onGet(/\/app\/categories\/\d+/).reply(config => {
  // Get event id from URL
  const categoryId = config.url.substring(config.url.lastIndexOf('/') + 1)
  console.log(`get /api/categories/${categoryId}`)

  const index = data.categories.findIndex(e => e.id === categoryId)
  const category = data.categories[index]

  if (category) {
    return [200, category]
  }
  return [404]
})

// ------------------------------------------------
// Post: Update Single category
// ------------------------------------------------
mock.onPost(/\/app\/categories\/\d+/).reply(config => {
  // Get event id from URL
  const categoryId = config.url.substring(config.url.lastIndexOf('/') + 1)
  console.log(`get /api/categories/${categoryId}`)

  const index = data.categories.findIndex(e => e.id === categoryId)
  const found = data.categories[index]

  if (found) {
    const { category } = JSON.parse(config.data)
    console.log('update data', category)
    data.categories[index] = { ...found, ...category }
    return [200, data.categories[index]]
  }
  return [404]
})
