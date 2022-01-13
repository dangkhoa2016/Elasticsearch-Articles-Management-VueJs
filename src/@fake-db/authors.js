import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/* eslint-disable global-require */
const data = {
  authors: [
    {
      "id": "1",
      "first_name": "ALAN",
      "last_name": "SCHWARZ",
      "created_at": "2021-10-12 09:54:13.870598",
      "updated_at": "2021-10-12 09:54:13.870598"
    },
    {
      "id": "2",
      "first_name": "ANAHAD",
      "last_name": "O'CONNOR",
      "created_at": "2021-10-12 09:54:16.215825",
      "updated_at": "2021-10-12 09:54:16.215825"
    },
    {
      "id": "3",
      "first_name": "ARTHUR",
      "last_name": "C.",
      "created_at": "2021-10-12 09:54:16.706442",
      "updated_at": "2021-10-12 09:54:16.706442"
    },
    {
      "id": "4",
      "first_name": "JODI",
      "last_name": "KANTOR",
      "created_at": "2021-10-12 09:54:19.416362",
      "updated_at": "2021-10-12 09:54:19.416362"
    },
    {
      "id": "5",
      "first_name": "JESSICA",
      "last_name": "SILVER-GREENBERG",
      "created_at": "2021-10-12 09:54:19.467862",
      "updated_at": "2021-10-12 09:54:19.467862"
    },
    {
      "id": "6",
      "first_name": "JANE",
      "last_name": "E.",
      "created_at": "2021-10-12 09:54:19.859540",
      "updated_at": "2021-10-12 09:54:19.859540"
    },
    {
      "id": "7",
      "first_name": "LYDIA",
      "last_name": "POLGREEN",
      "created_at": "2021-10-12 09:54:22.132989",
      "updated_at": "2021-10-12 09:54:22.132989"
    },
    {
      "id": "8",
      "first_name": "CARL",
      "last_name": "ZIMMER",
      "created_at": "2021-10-12 09:54:23.131161",
      "updated_at": "2021-10-12 09:54:23.131161"
    },
    {
      "id": "9",
      "first_name": "GRETCHEN",
      "last_name": "REYNOLDS",
      "created_at": "2021-10-12 09:54:25.341440",
      "updated_at": "2021-10-12 09:54:25.341440"
    },
    {
      "id": "10",
      "first_name": "THE",
      "last_name": "EDITORIAL",
      "created_at": "2021-10-12 09:54:30.004963",
      "updated_at": "2021-10-12 09:54:30.004963"
    },
    {
      "id": "11",
      "first_name": "PAM",
      "last_name": "BELLUCK",
      "created_at": "2021-10-12 09:54:30.384021",
      "updated_at": "2021-10-12 09:54:30.384021"
    },
    {
      "id": "12",
      "first_name": "BILL",
      "last_name": "KELLER",
      "created_at": "2021-10-12 09:54:30.857377",
      "updated_at": "2021-10-12 09:54:30.857377"
    },
    {
      "id": "13",
      "first_name": "PAUL",
      "last_name": "A.",
      "created_at": "2021-10-12 09:54:33.304116",
      "updated_at": "2021-10-12 09:54:33.304116"
    },
    {
      "id": "14",
      "first_name": "SARAH",
      "last_name": "ERUSH",
      "created_at": "2021-10-12 09:54:33.395020",
      "updated_at": "2021-10-12 09:54:33.395020"
    },
    {
      "id": "15",
      "first_name": "GINA",
      "last_name": "KOLATA",
      "created_at": "2021-10-12 09:54:33.727523",
      "updated_at": "2021-10-12 09:54:33.727523"
    },
    {
      "id": "16",
      "first_name": "KIRA",
      "last_name": "PEIKOFF",
      "created_at": "2021-10-12 09:54:36.097079",
      "updated_at": "2021-10-12 09:54:36.097079"
    },
    {
      "id": "17",
      "first_name": "MARK",
      "last_name": "BITTMAN",
      "created_at": "2021-10-12 09:54:38.476868",
      "updated_at": "2021-10-12 09:54:38.476868"
    },
    {
      "id": "18",
      "first_name": "MICHAEL",
      "last_name": "MOORE",
      "created_at": "2021-10-12 09:54:44.514923",
      "updated_at": "2021-10-12 09:54:44.514923"
    },
    {
      "id": "19",
      "first_name": "KATIE",
      "last_name": "THOMAS",
      "created_at": "2021-10-12 09:54:47.714745",
      "updated_at": "2021-10-12 09:54:47.714745"
    },
    {
      "id": "20",
      "first_name": "TAMAR",
      "last_name": "LEWIN",
      "created_at": "2021-10-12 09:54:51.605740",
      "updated_at": "2021-10-12 09:54:51.605740"
    },
    {
      "id": "21",
      "first_name": "SARAH",
      "last_name": "STODOLA",
      "created_at": "2021-10-12 09:54:54.421679",
      "updated_at": "2021-10-12 09:54:54.421679"
    },
    {
      "id": "22",
      "first_name": "ELISABETH",
      "last_name": "ROSENTHAL",
      "created_at": "2021-10-12 09:54:54.903331",
      "updated_at": "2021-10-12 09:54:54.903331"
    },
    {
      "id": "23",
      "first_name": "PAULA",
      "last_name": "SCHARGORODSKY",
      "created_at": "2021-10-12 09:54:58.285767",
      "updated_at": "2021-10-12 09:54:58.285767"
    },
    {
      "id": "24",
      "first_name": "JOHN",
      "last_name": "MARKOFF",
      "created_at": "2021-10-12 09:55:01.009336",
      "updated_at": "2021-10-12 09:55:01.009336"
    },
    {
      "id": "25",
      "first_name": "ANDREW",
      "last_name": "HIGGINS",
      "created_at": "2021-10-12 09:55:02.845285",
      "updated_at": "2021-10-12 09:55:02.845285"
    },
    {
      "id": "26",
      "first_name": "PAUL",
      "last_name": "BOUTIN",
      "created_at": "2021-10-12 09:55:05.534161",
      "updated_at": "2021-10-12 09:55:05.534161"
    },
    {
      "id": "27",
      "first_name": "NATHANIEL",
      "last_name": "STEIN",
      "created_at": "2021-10-12 09:55:05.852040",
      "updated_at": "2021-10-12 09:55:05.852040"
    },
    {
      "id": "28",
      "first_name": "MELANIE",
      "last_name": "WARNER",
      "created_at": "2021-10-12 09:55:06.258820",
      "updated_at": "2021-10-12 09:55:06.258820"
    },
    {
      "id": "29",
      "first_name": "GREG",
      "last_name": "BISHOP",
      "created_at": "2021-10-12 09:55:06.729967",
      "updated_at": "2021-10-12 09:55:06.729967"
    },
    {
      "id": "30",
      "first_name": "STEPHEN",
      "last_name": "MARCHE",
      "created_at": "2021-10-12 09:55:09.655871",
      "updated_at": "2021-10-12 09:55:09.655871"
    },
    {
      "id": "31",
      "first_name": "SHERRY",
      "last_name": "TURKLE",
      "created_at": "2021-10-12 09:55:11.668798",
      "updated_at": "2021-10-12 09:55:11.668798"
    },
    {
      "id": "32",
      "first_name": "KIRK",
      "last_name": "JOHNSON",
      "created_at": "2021-10-12 09:55:13.945848",
      "updated_at": "2021-10-12 09:55:13.945848"
    },
    {
      "id": "33",
      "first_name": "RACHEL",
      "last_name": "DONADIO",
      "created_at": "2021-10-12 09:55:14.402126",
      "updated_at": "2021-10-12 09:55:14.402126"
    },
    {
      "id": "34",
      "first_name": "MARK",
      "last_name": "MAZZETTI",
      "created_at": "2021-10-12 09:55:14.835205",
      "updated_at": "2021-10-12 09:55:14.835205"
    },
    {
      "id": "35",
      "first_name": "JUSTIN",
      "last_name": "ELLIOTT",
      "created_at": "2021-10-12 09:55:14.925034",
      "updated_at": "2021-10-12 09:55:14.925034"
    },
    {
      "id": "36",
      "first_name": "BENEDICT",
      "last_name": "NIGHTINGALE",
      "created_at": "2021-10-12 09:55:17.743024",
      "updated_at": "2021-10-12 09:55:17.743024"
    },
    {
      "id": "37",
      "first_name": "JENNIFER",
      "last_name": "BERMAN",
      "created_at": "2021-10-12 09:55:20.895175",
      "updated_at": "2021-10-12 09:55:20.895175"
    },
    {
      "id": "38",
      "first_name": "ADAM",
      "last_name": "FISHER",
      "created_at": "2021-10-12 09:55:24.951744",
      "updated_at": "2021-10-12 09:55:24.951744"
    },
    {
      "id": "39",
      "first_name": "DELIA",
      "last_name": "EPHRON",
      "created_at": "2021-10-12 09:55:27.873151",
      "updated_at": "2021-10-12 09:55:27.873151"
    },
    {
      "id": "40",
      "first_name": "ERIC",
      "last_name": "A.",
      "created_at": "2021-10-12 09:55:31.238569",
      "updated_at": "2021-10-12 09:55:31.238569"
    },
    {
      "id": "41",
      "first_name": "JULIE",
      "last_name": "CRESWELL",
      "created_at": "2021-10-12 09:55:31.605094",
      "updated_at": "2021-10-12 09:55:31.605094"
    },
    {
      "id": "42",
      "first_name": "CATHERINE",
      "last_name": "SAINT",
      "created_at": "2021-10-12 09:55:34.050897",
      "updated_at": "2021-10-12 09:55:34.050897"
    },
    {
      "id": "43",
      "first_name": "NICOLE",
      "last_name": "PERLROTH",
      "created_at": "2021-10-12 09:55:37.316383",
      "updated_at": "2021-10-12 09:55:37.316383"
    },
    {
      "id": "44",
      "first_name": "TARA",
      "last_name": "PARKER-POPE",
      "created_at": "2021-10-12 09:55:40.078516",
      "updated_at": "2021-10-12 09:55:40.078516"
    },
    {
      "id": "45",
      "first_name": "PAUL",
      "last_name": "KRUGMAN",
      "created_at": "2021-10-12 09:55:43.177747",
      "updated_at": "2021-10-12 09:55:43.177747"
    },
    {
      "id": "46",
      "first_name": "SABRINA",
      "last_name": "TAVERNISE",
      "created_at": "2021-10-12 09:55:45.707131",
      "updated_at": "2021-10-12 09:55:45.707131"
    },
    {
      "id": "47",
      "first_name": "CORAL",
      "last_name": "DAVENPORT",
      "created_at": "2021-10-12 09:55:51.246479",
      "updated_at": "2021-10-12 09:55:51.246479"
    },
    {
      "id": "48",
      "first_name": "ARNON",
      "last_name": "GRUNBERG",
      "created_at": "2021-10-12 09:55:52.781367",
      "updated_at": "2021-10-12 09:55:52.781367"
    },
    {
      "id": "49",
      "first_name": "JENNIFER",
      "last_name": "A.",
      "created_at": "2021-10-12 09:55:57.813920",
      "updated_at": "2021-10-12 09:55:57.813920"
    },
    {
      "id": "50",
      "first_name": "JOHN",
      "last_name": "T.",
      "created_at": "2021-10-12 09:56:01.014135",
      "updated_at": "2021-10-12 09:56:01.014135"
    },
  ].map(x => { x.fullName = x.first_name + ' ' + x.last_name; return x; }),
}
/* eslint-enable */

// ------------------------------------------------
// GET: Return authors
// ------------------------------------------------
mock.onGet('/api/authors').reply(async config => {
  // eslint-disable-next-line object-curly-newline
  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false,
  } = config.params
  /* eslint-enable */

  console.log('get /api/authors', perPage, page, config)
  await timeout(Math.floor(Math.random() * 2) * 1000)

  const queryLowered = q.toLowerCase()
  const filteredData = data.authors.filter(
    author =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (author.first_name.toLowerCase().includes(queryLowered) || author.last_name.toLowerCase().includes(queryLowered))
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      authors: paginateArray(sortedData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// POST: Add new author
// ------------------------------------------------
mock.onPost('/api/authors').reply(config => {
  // Get event from post data
  const { author } = JSON.parse(config.data)
  console.log('post /api/authors', author)

  const { length } = data.authors
  let lastIndex = 0
  if (length) {
    lastIndex = data.authors[length - 1].id
  }
  author.id = lastIndex + 1
  author.created_at = new Date()
  author.updated_at = new Date()

  data.authors.push(author)

  return [201, { author }]
})

// ------------------------------------------------
// GET: Return Single author
// ------------------------------------------------
mock.onGet(/\/app\/authors\/\d+/).reply(config => {
  // Get event id from URL
  let authorId = config.url.substring(config.url.lastIndexOf('/') + 1)
  console.log(`get /api/authors/${authorId}`)

  const index = data.authors.findIndex(e => e.id === authorId)
  const author = data.authors[index]

  if (author) {
    return [200, author]
  }
  return [404]
})

// ------------------------------------------------
// Post: Update Single author
// ------------------------------------------------
mock.onPost(/\/app\/authors\/\d+/).reply(config => {
  // Get event id from URL
  const authorId = config.url.substring(config.url.lastIndexOf('/') + 1)
  console.log(`get /api/authors/${authorId}`)

  const index = data.authors.findIndex(e => e.id === authorId)
  const found = data.authors[index]

  if (found) {
    const { author } = JSON.parse(config.data)
    console.log('update data', author)
    data.authors[index] = { ...found, ...author }
    return [200, data.authors[index]]
  }
  return [404]
})
