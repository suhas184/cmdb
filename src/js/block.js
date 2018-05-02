function getBlock() {
 var transactionId = document.getElementById("textbox1").value;
 console.log(transactionId);
 //web3.toAscii(web3.eth.getTransaction('transactionId').input).replace(/\u0000/g, '').replace(/\yÖ/g, '').replace(/\u0001Á/g,'').replace(/\u0001@A/g,'').replace(/\@A/g ,'')
 web3.eth.getTransaction(transactionId, function(error, result){
    if(!error){
        var output = result.input;
        var input = web3.toAscii(output).replace(/\u0000/g, '').replace(/\yÖ/g, '').replace(/\u0001Á/g,'').replace(/\u0001@A/g,'').replace(/\@A/g ,'').replace(/\u0000D/g,'').replace(/\u0000@/g,'')
        console.log(input);
        document.getElementById("blockdata").innerHTML = input;
    }else
        console.error(error);
})
}
