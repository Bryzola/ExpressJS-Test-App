var data = [];

var resetData = function() {
    data = [];
    return;
}

var accountData = function(id) {
    console.log(data);
    var filter = data.find(x => x.id == id);
    return filter ? filter.balance : null;
}

var updateAccount = function(request) {
    switch(request.type) {
        case 'deposit':
            var destinationData = data.find(x => x.id == request.destination);
            
            if(!destinationData) {
                destinationData = {
                    "id": request.destination,
                    "balance": request.amount
                }
                data.push(destinationData);
            } else {
                destinationData.balance += request.amount;
            }
            
            return {"destination": destinationData};
        case 'withdraw':
            var originData = data.find(x => x.id == request.origin);
            if(originData) {
                originData.balance -= request.amount;
                return {"origin": originData};
            }
            return null;
        case 'transfer':
            var destinationData = data.find(x => x.id == request.destination);
            var originData = data.find(x => x.id == request.origin);
            if(originData) {
                if(!destinationData) {
                    destinationData = {
                        "id": request.destination,
                        "balance": request.amount
                    }
                    data.push(destinationData);
                } else {
                    destinationData.balance += request.amount;
                }
                
                originData.balance -= request.amount;
                
                return {"origin": originData, "destination": destinationData};
            }
            return null;
        default:
            return null;
    }
}

exports.resetData = resetData;
exports.accountData = accountData;
exports.updateAccount = updateAccount;
