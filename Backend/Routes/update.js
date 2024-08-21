const express = require('express')
const Model = require('../Models/model');
const Team = require('../Models/team');
const User = require('../Models/user');
const app = express()

app.post('/postModel', async (req, res) => {
    try {
        // Get the model ID from the request body or headers
        const modelId = req.header('model-id');

        // Create a new submodel instance with the provided data
        const newSubModel = new Model({
            name: req.body.name,  // Example field
            // Add other fields as needed
        });

        // Save the new submodel to the database
        const savedSubModel = await newSubModel.save();

        // Find the model by ID and update it with the new submodel
        const updatedModel = await Model.findByIdAndUpdate(
            modelId,
            { $push: { submodels: savedSubModel._id } },  // Add the new submodel ID to the submodels array
            { new: true, useFindAndModify: false }  // Return the updated document
        )

        // Respond with the updated model
        res.status(200).json(updatedModel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getModel', async (req, res) => {
    try {
        const modelId = req.header('model-id')
        if (!modelId) {
            return res.status(400).send('User ID is required in the header.');
        }

        const user = await Model.findById(modelId).populate('submodels');

        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.json(user.submodels);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
});


app.get('/getTeam', async (req, res) => {
    try {
        const teamId = req.header('model-id');

        if (!teamId) {
            return res.status(400).send('Team ID is required in the header.');
        }

        const team = await Model.findById(teamId).populate('teams')

        if (!team) {
            return res.status(404).send('Team not found.');
        }

        res.json(team.teams);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
});


app.post('/postTeam', async (req, res) => {
    try {
        const modelId = req.header('model-id');
        const { name } = req.body;  // Team name from request body

        if (!modelId || !name) {
            return res.status(400).send('Model ID and team name are required.');
        }

        // Create a new team with no members initially
        const newTeam = new Team({
            name: name,
            members: []  // No members initially
        });

        // Save the new team to the database
        const savedTeam = await newTeam.save();

        // Update the model to include the new team
        const updatedModel = await Model.findByIdAndUpdate(
            modelId,
            { $push: { teams: savedTeam._id } },  // Add the new team ID to the model's teams array
            { new: true, useFindAndModify: false }  // Return the updated model
        )

        if (!updatedModel) {
            return res.status(404).send('Model not found.');
        }

        // Respond with the updated model
        res.status(200).json(updatedModel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/getUser', async (req, res) => {
    try {
        const userId = req.header('team-id');

        if (!userId) {
            return res.status(400).send('User ID is required in the header.');
        }

        const user = await Team.findById(userId).populate('members');

        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.json(user.members);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
});

app.post('/postUser', async (req, res) => {
    try {
        const teamId = req.header('team-id');
        const { name,role } = req.body;  // Team name from request body

        if (!teamId || !name) {
            return res.status(400).send('Model ID and team name are required.');
        }

        // Create a new team with no members initially
        const newUser = new User({
            name: name,
            role: role
        });

        // Save the new team to the database
        const savedUser = await newUser.save();

        // Update the model to include the new team
        const updatedModel = await Team.findByIdAndUpdate(
            teamId,
            { $push: { members: savedUser._id } },  // Add the new team ID to the model's teams array
            { new: true, useFindAndModify: false }  // Return the updated model
        )

        if (!updatedModel) {
            return res.status(404).send('Model not found.');
        }

        // Respond with the updated model
        res.status(200).json(updatedModel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/getProduct', async (req, res) => {
    try {
        // Find the "IBM_START" model and populate its submodels
        const model = await Model.findOne({ name: "IBM_START" }).populate('submodels');

        if (!model) {
            return res.status(404).json({ message: 'Model not found' });
        }

        // Optionally, if you want to retrieve products under those submodels:
        // const products = await Product.find({ model: { $in: model.submodels } });

        // Sending the model details with populated submodels
        res.json(model.submodels);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
});


app.post('/postProduct', async (req, res) => {
    try {
        const { name } = req.body;

        // Create a new product
        const newProduct = new Model({ name });
        const savedProduct = await newProduct.save();

        // Find the IBM_START model and add the new product's ID to its submodels
        const ibmStartModel = await Model.findOneAndUpdate(
            { name: "IBM_START" },
            { $push: { submodels: savedProduct._id } },
            { new: true }
        );

        if (!ibmStartModel) {
            return res.status(404).json({ error: "IBM_START model not found" });
        }

        res.status(201).json({
            message: "Product added and submodel updated successfully",
            product: savedProduct,
            updatedIBMModel: ibmStartModel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = app;