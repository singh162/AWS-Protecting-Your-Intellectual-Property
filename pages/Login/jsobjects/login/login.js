export default {
	exitQuery:'',
	modalText:'',
	signInQuery: '',
	async checkExpireUser(loginId) {
		// Fetch the expire_at value from the database
		let expireDate = await checkExpire.run({id:loginId});
		if (expireDate.length === 0) {

			return true;  // User not found
		}
		const expireAt = moment.utc(expireDate[0].expire_at).format('YYYY-MM-DD HH:mm:ss');


		const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')


		// Check if the current time is after the expire_at time
		if (moment(currentTime).isAfter(expireAt)) {
			return true;  // Session expired
		}
		return false;  // Session is still valid
	},
	async signInRightHolder() {
		if(!Input1.text){
			showAlert("Email Address  or User Name is required", "error");
		}
		else if(!Input2.text){
			showAlert("Password is required", "error");
		}
		else{
			this.exitQuery = `SELECT id FROM test_taoq_reach.rightHolder WHERE email = '${Input1.text}' or username ='${Input1.text}'`;

			// Run the exit query to check if the user exists
			const result = await ExitRightHolder.run();
			if (result.length > 0) {
				const hashedPassword = CryptoJS.SHA256(Input2.text).toString(); // Use the same hash method as used for registration

				this.signInQuery = `
    SELECT id, username, email , email_verified
    FROM test_taoq_reach.rightHolder
    WHERE (email = '${Input1.text}')
    AND password_hash = '${hashedPassword}'
`;

				let data = await signInRightHolder.run();
				if(data && data.length >0){
					storeValue("rightHolderUserId",data[0].id);
					await storeValue("signUpRightHolderEmail",Input1.text);
					if(data[0].email_verified){
						let checkData = await checkRightHolderInfoExit.run({id:data[0].id});
						let isExpire = await this.checkExpireUser(data[0].id);
						if(isExpire){
							await updateExpireDate.run({id:data[0].id});
						}
						if (checkData && checkData.length > 0) {
							if (checkData[0].Status === "Under Review") {
								this.modalText = `Dear ${checkData[0].rightHolderName},
Thank you for your submission. Your application is currently being reviewed by SAIP.
We appreciate your patience as we work through this process.
You will receive an email as soon as your verification is complete.

Would you like to view your profile?
`;
								await showModal(Modal2.name);
								setTimeout(function() {
									closeModal(Modal2.name);
								}, 30000);

							} else if (checkData[0].Status === "Rejected") {
								this.modalText = `Dear ${checkData[0].rightHolderName},
We regret to inform you that your profile has not been approved by the SAIP due to insufficient information or documentation.
For further assistance and clarification, we kindly encourage you to reach out to the team directly. 

Would you like to view your profile?
						`;
								await showModal(Modal2.name);
								setTimeout(function() {
									closeModal(Modal2.name);
								}, 30000);
							}
							else if (checkData[0].Status === "Return For Additional Information") {
								this.modalText = `Dear ${checkData[0].rightHolderName},
Your profile requires additional information before it can be approved by SAIP.
To proceed, please provide the following details: ${checkData[0].reasonStatus}.
We appreciate your prompt attention to this matter and look forward to completing your verification.

Would you like to view your profile?`;
								await showModal(Modal2.name);
								setTimeout(function () {
									closeModal(Modal2.name);
								}, 30000);

							} 
							else {
								navigateTo('Complaints', {}, 'SAME_WINDOW');
								showAlert("login successfully","info");
							}
						}
						else{
							navigateTo('Registeration', {}, 'SAME_WINDOW');
							showAlert("login successfully","info");
						}
					}
					else
					{
						showModal(Modal7Copy.name)
					}
				}
				else
				{
					showAlert("invalid username or email Address and password","error");
				}
			}
			else{
				showAlert("Email Address not found, please create the account","warning");
			}
		}


	}
}