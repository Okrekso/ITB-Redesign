function createRequest() {
	let regFields = '#popup-field #registration .fields';

	let data = {
		name: $(`${regFields} #name`).val(),
		email: $(`${regFields} #email`).val(),
		pass: $(`${regFields} #password`).val(),
		stud_group: $(`${regFields} #group`).val()
	};
	console.log(data);
	if (chekAllRegFields()) {
		$.ajax({
			type: 'POST',
			url: server + '/newRequest',
			data: data,
			success: function(response) {
				closeRegistration();
				console.log('response:', response);
			}
		});
	}
}

function login() {
	let email = $('#login .fields #email-login').val();
	let pass = $('#login .fields #password-login').val();
	if (chekAllLoginFields())
		$.ajax({
			type: 'GET',
			url: server + '/login',
			data: { email: email, pass: pass },
			success: function(secureCodeData) {
				if (secureCodeData.length > 0) {
                    let code = secureCodeData[0].Secure_code;
                    console.log(code, secureCodeData);
                    $.cookie('secureCode', code);
                    
                    if($.cookie('secureCode')!=undefined){
                        closePopup("#login");
                        closeField();
                        $("#bLogin").prop("disabled",true);
                        $("#bBecome").prop("disabled",true);
                    }
				}
			}
		});
}
