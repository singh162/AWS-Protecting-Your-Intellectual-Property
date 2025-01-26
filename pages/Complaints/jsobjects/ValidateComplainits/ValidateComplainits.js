export default {
	async validateComplaints() {
		let isValid = true;
		let errorMessage = "";
		const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/; 

		// Validate Category selection
		if (!Select2 || !Select2.selectedOptionLabel) {
			isValid = false;
			errorMessage = "Please select a Category.\n";
		}
		// Validate Original Work / Copyright input and URL format
		else if (!originalWork || originalWork.text.trim() === "") {
			isValid = false;
			errorMessage = "Please provide the Original Work / Copyright.";
		} else if (!urlPattern.test(originalWork.text.trim())) {
			isValid = false;
			errorMessage = "The Original Work URL is invalid. Please provide a valid URL.\n";
		}
		else if(!Select3.selectedOptionLabel){
			isValid = false;
			errorMessage += "Please select the title.";
		}
		// Validate checkbox fields
		else if (!Checkbox1.isChecked) {
			isValid = false;
			errorMessage += "Please acknowledge the Good Faith Belief and Authority to act.";
		}
		// Validate if at least one Infringing URL and Description is added
		else if (List1.listData.length === 0) {
			isValid = false;
			errorMessage = "Please add at least one Infringing URL and Description.\n";
		} else {
			// Loop through the dynamically added fields for validation
			const item = AddListInput.listArray[AddListInput.listArray.length-1];
			let i=AddListInput.listArray.length-1;
			console.log(item, "item.input1");

			// Validate Infringing URL presence and format
			if (!item.input1 || item.input1.trim() === "") {
				isValid = false;
				errorMessage=(`Infringing URL is missing in page ${i + 1}.`);
			} else if (!urlPattern.test(item.input1.trim())) {
				isValid = false;
				errorMessage= (`The Infringing URL in page ${i + 1} is invalid. Please provide a valid URL.`);
			} else if (item.input13Copy && !urlPattern.test(item.input13Copy.trim())) {
				isValid = false;
				errorMessage=(`The Infringing Sub URL in page ${i + 1} is invalid. Please provide a valid URL.`);
			} else if (!item.FilePicker1 || item.FilePicker1.length === 0) {
				isValid = false;
				errorMessage=(`Please provide proof for Infringing URL ${item.input1} in page ${i + 1}.`);
			} else if (!item.Description || item.Description.trim() === "") {
				isValid = false;
				errorMessage.push(`Description is missing in page ${i + 1}.`);
			} else {
				const trimmedUrl = item.input1.trim();

				// Check for duplicate URLs
				if (AddListInput.listArray.length>1  && AddListInput.urlSet.has(trimmedUrl)) {
					isValid = false;
					const firstPageNumber = AddListInput.urlPageMap[trimmedUrl]; // Get the page number where it was first found
					errorMessage=(`Duplicate Infringing URL (${trimmedUrl}) found in the list at page ${i + 1}. It was first found at page ${firstPageNumber}. Please remove the duplicate.`);
				} else {
					if(AddListInput.listArray.length>1){
						AddListInput.urlSet.add(trimmedUrl);
					}
					AddListInput.urlPageMap[trimmedUrl] = i + 1; // Store the current page number (i + 1)

					// Check if URL already exists in the database
					let data = await GetExitsInfringingUrl.run({ infringing_url: trimmedUrl });
					if (data && data.length > 0) {
						isValid = false;
						errorMessage=(`This Infringing URL (${trimmedUrl}) has already been submitted. To proceed with the complaint, please remove the duplicate URL from the list or use a different Infringing URL. For assistance, contact SAIP.`);
					}
				}
			}

		}

		// Show alert if validation fails
		if (!isValid) {
			showAlert(errorMessage, "error");
		} else {
			showModal(Modal2.name);
		}
	}
}
