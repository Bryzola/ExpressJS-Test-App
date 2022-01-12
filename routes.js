var express = require('express');
var router = express.Router();

var services = require('./services');


router.post('/reset', function(req, res) {
    services.resetData();
    res.status(200);
    res.send("OK");
});

router.route('/balance')
    .get(function(req, res) {
        var tempStatus = 404;
        var tempSend = 0;

        if(req.query.account_id) {
            var result = services.accountData(req.query.account_id)
            if(result != null){
                tempStatus = 200;
                tempSend = result;
            }
        }

        res.status(tempStatus);
        res.json(tempSend);
    });

router.route('/event')
    .post(function(req, res) {
        var tempStatus = 404;
        var tempSend = 0;
        var result = services.updateAccount(req.body)
            if(result != null){
                tempStatus = 201;
                tempSend = result;
            }

        res.status(tempStatus);
        res.json(tempSend);
});

module.exports = router;