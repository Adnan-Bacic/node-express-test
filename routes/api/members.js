const express = require('express');
const uuid = require('uuid');
const members = require('../../Members');

const router = express.Router();

//gets all members
router.get('/', (req, res) => {
    res.json(members)
});

//gets single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    //return data if found, else return a message
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id} found` })
    }
});

        //create member
        router.post('/', (req, res) => {
            //res.send(req.body);
            const newMembner = {
                id: uuid.v4(),
                name: req.body.name,
                email: req.body.email
            };

            if(!newMembner.name || !newMembner.email){
                return res.status(400).json({msg: 'please include a name and email'});

            }

            members.push(newMembner);

            //return data to request
            res.json(members);
            
            //res.redirect('/')
        });

//update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : mamber.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({msg: 'member updated', member })
            }
        });
    } else {
        res.status(400).json({msg: `No member with the id if ${req.params.id} found` })
    }
});

//delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({
        msg: 'member deleted',
        members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({msg: `No member with the id if ${req.params.id} found` })
    }
});

module.exports = router;