// Dependencies

const express = require("express")
const path = require("path")

// Sets up the Express App

const app = express()
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const availabelTables = 5
// Star Wars people (DATA)

const tables = []
  

const wait = []

// Routes

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "home.html")))
app.get("/reserve", (req, res) =>
  res.sendFile(path.join(__dirname, "make.html"))
)
app.get("/tables", (req, res) =>
  res.sendFile(path.join(__dirname, "view.html"))
)

// Displays all people
app.get("/api/tables", (req, res) => res.json(tables))
app.get("/api/waitlist", (req, res) => res.json(wait))

// Displays a single character, or returns false
app.get("/api/tables/:person", (req, res) => {
  const chosen = req.params.person

  console.log(chosen)

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i])
    }
  }

  return res.json(false)
})

// Create New people - takes in JSON input
app.post("/api/tables", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  console.log(tables.length)
  if (tables.length < availabelTables) {
    const newTable = req.body
    tables.push(newTable)
    res.send(true)
  } else {
    const newWait = req.body
    wait.push(newWait)
    res.send(false)
  }
})

app.post("/api/clear", (req, res) => {
    tables=[]
    wait=[]
})

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
