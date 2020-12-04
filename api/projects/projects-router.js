const router = require("express").Router()
const Projects = require("./projects-model")

router.get("/", (req, res) => {
  Projects.get()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  }) 
})

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
  .then(data => {
    if(data) {
      res.status(200).json(data)
    } else {
      res.status(404)
    }
    
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
})

router.post("/", (req, res) => {
  Projects.insert(req.body)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
})

router.put("/:id", (req, res) => {
  Projects.update(req.params.id, req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(400).json(err.message)
  })
})

router.delete("/", (req, res) => {
  Projects.remove(req.id)
  .then(() => {
    res.status(200)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
})

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
})

module.exports = router
