export default {
	index:1,
	urlSet:"",
	urlPageMap:"",
	// Initial list array to hold dynamic fields, starting with one entry
	listArray: [{ id: this.index, input1: '',input13Copy: '', Description: '', FilePicker1: [] }],
	lsitPageNo:1,

	async complaintCheck() {
		const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/; // URL validation regex pattern

		this.urlSet = new Set();
		this.urlPageMap = {}; // Object to track the first occurrence of each URL
		let isValid = true;
		let errorMessages = [];

		for (let i = 0; i < AddListInput.listArray.length; i++) {
			const item = AddListInput.listArray[i];
			console.log(item, "item.input1");

			// Validate Infringing URL presence and format
			if (!item.input1 || item.input1.trim() === "") {
				isValid = false;
				errorMessages.push(`Infringing URL is missing in page ${i + 1}.`);
			} else if (!urlPattern.test(item.input1.trim())) {
				isValid = false;
				errorMessages.push(`The Infringing URL in page ${i + 1} is invalid. Please provide a valid URL.`);
			} else if (item.input13Copy && !urlPattern.test(item.input13Copy.trim())) {
				isValid = false;
				errorMessages.push(`The Infringing Sub URL in page ${i + 1} is invalid. Please provide a valid URL.`);
			} else if (!item.FilePicker1 || item.FilePicker1.length === 0) {
				isValid = false;
				errorMessages.push(`Please provide proof for Infringing URL ${item.input1} in page ${i + 1}.`);
			} else if (!item.Description || item.Description.trim() === "") {
				isValid = false;
				errorMessages.push(`Description is missing in page ${i + 1}.`);
			} else {
				const trimmedUrl = item.input1.trim();

				// Check for duplicate URLs
				if (this.urlSet.has(trimmedUrl)) {
					isValid = false;
					const firstPageNumber = this.urlPageMap[trimmedUrl]; // Get the page number where it was first found
					errorMessages.push(`Duplicate Infringing URL (${trimmedUrl}) found in the list at page ${i + 1}. It was first found at page ${firstPageNumber}. Please remove the duplicate.`);
				} else {
					this.urlSet.add(trimmedUrl);
					this.urlPageMap[trimmedUrl] = i + 1; // Store the current page number (i + 1)

					// Check if URL already exists in the database
					let data = await GetExitsInfringingUrl.run({ infringing_url: trimmedUrl });
					if (data && data.length > 0) {
						isValid = false;
						errorMessages.push(`This Infringing URL (${trimmedUrl}) has already been submitted. To proceed with the complaint, please remove the duplicate URL from the list or use a different Infringing URL. For assistance, contact SAIP.`);
					}
				}
			}
		}

		return { isValid, errorMessages };
	},
	// Function to add new input fields dynamically
	async Button5onClick() {
		// Generate a unique ID for each new entry
		this.index = this.index+1;
		const newId = this.index;


		let { isValid, errorMessages } = await this.complaintCheck();

		if(isValid){
			// Add a new input field object to the array
			this.listArray.push({ id: newId, input1: '',input13Copy: '', Description: '',FilePicker1: []});
			// Log the updated list data to the console
			// Update the List1 widget data with the new input fields array
			List1.listData.push(this.listArray);
			const itemsPerPage = List1.pageSize; // The number of items per page
			const totalItems = this.listArray.length;
			this.lsitPageNo = Math.ceil(totalItems / itemsPerPage); // Calculate the page 
		}
		else
		{
			showAlert(`${errorMessages}`,"error");
		}
	},

	// Function to delete an input field container
	deleteInputField(id) {
		// Filter out the container with the matching ID
		const index = this.listArray.findIndex(item => item.id === id);
		// Check if the element is found
		if (index !== -1) {

			// Remove the element at the found index using splice
			this.listArray.splice(index, 1);
			List1.listData.push([...this.listArray]);
		}
		// Log the updated list data to the console


	},
	removeFileListOnCrosssClick(id) {
		const index = this.listArray.findIndex(item => item.id === id);
		if (index !== -1) {
			List1.listData[List1.pageNo-1].FilePicker1 = [];
			this.listArray[index].FilePicker1 = []; // Reset the file array
			resetWidget("FilePicker1", true); // Reset the FilePicker widget
		}

	},
	// Function to handle input changes
	handleInputChange(id, field, value) {
		console.log("handleValue",id,field,value);
		if (field === "FilePicker1") {
			const index = this.listArray.findIndex(item => item.id === id);
			if (index !== -1) {
				const currentFiles = this.listArray[index].FilePicker1 || [];
				const newFiles = value.filter(
					file => !currentFiles.some(existingFile => existingFile.name === file.name)
				);
				// Remove files that are no longer present in the value array
				const updatedFiles = currentFiles.filter(
					existingFile => value.some(file => file.name === existingFile.name)
				);

				// Combine updated existing files with new files
				const combinedFiles = [...updatedFiles, ...newFiles];

				// Check the file count limit
				if (combinedFiles.length <= 3) {
					this.listArray[index].FilePicker1 = combinedFiles;
				} else {
					console.warn("Cannot add more than 3 files.");
				}
			}
		} else {
			this.listArray = this.listArray.map(item =>
																					item.id === id ? { ...item, [field]: value } : item
																				 );
		}


		List1.listData.push([...this.listArray]);
	}


}
