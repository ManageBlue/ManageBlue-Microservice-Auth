const router = require("express").Router();
const usersController = require("../controllers/users");
const registerCheck = require("../middlewares/registerCheck")

module.exports = usersRouter => {

    usersRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // Return calling user data
    router.get("/me",  usersController.returnMe);

    // Return user by ID
    router.get("/:id",  usersController.returnByID);

    // Return all users
    router.get("/",  usersController.returnAll);

    // Update user by ID
    router.put("/:id",  usersController.update);

    // Delete user by ID
    router.delete("/:id",  usersController.delete);

    // Register new user
    router.post("/register", [registerCheck.checkUniqueUsernameEmail], usersController.register);


    usersRouter.use('/api/v1/users', router);
};
