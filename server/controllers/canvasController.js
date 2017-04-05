const Canvas = require('./../models/canvasModel');

const canvasController = {

    createCanvas(req, res) {
        Canvas.create(req.body, (err, result) => {
            console.log("i am req.body from createCanvas: ", req.body)
            if (err) {
                return res.status(400).end({error: 'Canvas Creation Failed'});
            } else {
                return res.status(200).json(result);
            }
        })
    },

    getCanvas(req, res) {
      console.log(req.params.roomNum);
        Canvas.findOne({roomNum: req.params.roomNum}, (err, result) => {
             if (err) {
                return res.status(400).end({error: 'Getting Canvas Failed'});
            } else {
                return res.status(200).json(result);
            }
        })
    }
    //JWT test route
    // getAllCanvas(req, res) {
    //     Canvas.find({},(err, result) => {
    //         if (err) {
    //             return res.status(400).end({error: 'Getting AllCanvas Failed'});
    //         }
    //         else {
    //             return res.status(200).json(result)
    //         }
    //     })
    // }

};

module.exports = canvasController;
