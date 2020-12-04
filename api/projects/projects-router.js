const router = require("express").Router();
const Projects = require("./projects-model");

const validateProj = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  if (!name) {
    res.status(400).json({ message: "Missing description." });
  } else if (!description) {
    res.status(400).json({ message: "Missing notes." });
  } else {
    next();
  }
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res
          .status(404)
          .json({ message: `Project with the id of ${id} does not exist.` });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the action." });
    });
};

router.get("/", (req, res) => {
  Projects.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:id", validateId, (req, res) => {

  Projects.get(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/", validateProj, (req, res) => {
  Projects.insert(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.put("/:id", (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.get("/:id/actions", (req, res) => {
    Projects.getProjectActions(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  });

router.delete("/:id", validateId, (req, res) => {
    const { id } = req.params
    Projects.remove(id)
    .then(() => {
        res.status(200).json({ message: 'The project has been deleted.' })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error removing the project.' })
    })
});



module.exports = router;
