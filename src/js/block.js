function getBlock() {
 var transactionId = document.getElementById("textbox1").value;
 console.log(transactionId);
 //web3.toAscii(web3.eth.getTransaction('transactionId').input).replace(/\u0000/g, '').replace(/\yÖ/g, '').replace(/\u0001Á/g,'').replace(/\u0001@A/g,'').replace(/\@A/g ,'')
 web3.eth.getTransaction(transactionId, function(error, result){
    if(!error){
        var output = result.input;
        var input = web3.toAscii(output).replace(/\u0000/g, '').replace(/\yÖ/g, '').replace(/\u0001Á/g,'').replace(/\u0001@A/g,'').replace(/\@A/g ,'').replace(/\u0000D/g,'').replace(/\u0000@/g,'').replace(/\u?]fi à `/g,'');
//        var input1 = input.replace('', '$').replace('', '$').replace('', '$').replace('', '$');
        var input2 = input.replace('', 'Description of the Change:').replace('', ',Time of the Change:').replace('', ',New RAM:').replace('', ',Old RAM:');
// ?]fi à `Upgrade RAM12th May42
        var input3 = web3.toAscii(output).replace(/[^\x20-\x7E]+/g, '').replace(']fi `', '');
        console.log(input);
        document.getElementById("blockdata").innerHTML = input3;
        document.getElementById("textbox1").value = "";
    }else
        console.error(error);
})
}

function clearData() {
  document.getElementById("blockdata").innerHTML = "";
  document.getElementById("textbox1").value = "";
}
