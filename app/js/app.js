$(function () {
			
	var $messages = $(".messages"), 
		$input = $("input.message-text"),
		$name = $("input.name"),
		$server = $("input.server"),
		socket,
		buildMessage = function(data) {
			return '<div class="message"><span class="name">' +data.name +':</span>' + data.text + '</div>';
		},
		scrollToBottom = function() {
	    	$messages[0].scrollTop = $messages[0].scrollHeight - $messages[0].offsetHeight;
		};

  	$input.on('keypress', function(event){

        if(event.which == 13) {
        	var text = $input.val(),
  				name = $name.val();

  			if(name === undefined || name === "") {
  				name = "Anonymous"
  			}
            socket.emit('message', {
            	name: name,
            	text: text
            });
            $input.val('');
        }
    });

    $server.on('keypress', function (event) {
    	if (event.which === 13) {
    		socket = io.connect('http://' + $server.val());
    		console.log("connecting on " +$server.val());
    		socket.on("connect", function () {
    			socket.on('message', function (data) {
			    	$messages.append(buildMessage(data));
			    	scrollToBottom();
			  	});	
			  	socket.on('history', function (dataList) {
			  		var messages = "";
			  		for(var i = 0; i < dataList.length; i++) {
			  			messages += buildMessage(dataList[i]);
			  		}
			  		$messages.append(messages);
			  		scrollToBottom();
			  	});	
        	});
        	
    		
        }
    });
});