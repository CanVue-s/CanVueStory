const Canvas = require('./../models/canvasModel');

const canvasController = {

    createCanvas(req, res) {
        Canvas.create(req.body, (err, result) => {
            console.log(req.body)
            if (err) {
                return res.status(400).end({error: 'Canvas Creation Failed'});
            } else {
                return res.status(200).json(result);
            }
        })
    },

    getCanvas(req, res) {
      
        Canvas.findOne({roomNum: req.body.roomNum}, (err, result) => {
             if (err) {
                return res.status(400).end({error: 'Getting Canvas Failed'});
            } else {
                return res.status(200).json(result);
            }
        })
    }

};

module.exports = canvasController;
