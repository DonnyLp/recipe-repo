import App from "./src/App.js";

import User from "./src/schemas/account/User.js";
import Admin from "./src/schemas/account/Admin.js";

//User SignUp Endpoint
App.post('/createUser', async(req, res) => {
    console.log(`SignUp Attempt Recieved: ${req.body.email}`);
    try {
        const { username, email, password } = req.body;
        User.exists({username: username}).then(async(result) => {
            if(Object.is(result, null)) { //no user exists
                const date_created = new Date(); //get date when recipe was created
                const status = "unverified"; //users account status
                const measurement = "imperial";

                const newUser = new User({username, email, password_hash: password, date_created, status, measurement});
                await newUser.save()

                console.log(`New User Created: ${newUser}`)
                res.status(201).send({message: "New User Created"});
            } else {
                console.log(`Username: ${username} already exists`);
                res.status(400).send({message: "User already exists"});
            }
        });

    } catch(err) {
        console.log(`Error during signup: ${err}`);
        res.status(500).send(err);
    }
});

