export default {
	async checkBase64FileType(base64Data) {
		const base64Signatures = {
			"JVBERi0": "application/pdf", // PDF
			"iVBORw0KGgo": "image/png",  // PNG
			"/9j/": "image/jpeg"          // JPEG
		};

		for (let s in base64Signatures) {
			if (base64Data.indexOf(s) === 0) {
				return base64Signatures[s];  // Return MIME type
			}
		}
	},
	async previewCopyRightDocument(){
		try{
			let TableImageData= await GetRightHolderInfo.data[0].contentOwnerShip;
			let mineType= await this.checkBase64FileType(TableImageData);
			if(mineType.includes("pdf"))
			{
				showModal(OwershipLetterDocumentView.name);
			}
			else{
				showModal(OwershipLetterImageView.name);
			}
		}
		catch(ex)
		{
			showAlert("Error View the Owership Certificate",ex);
			throw ex;
		} 
	},
	async previewAutorizedLetter(){
		try{
			let TableImageData= await GetRightHolderInfo.data[0].copyRightLetter;
			let mineType= await this.checkBase64FileType(TableImageData);
			if(mineType.includes("pdf"))
			{
				showModal(AutorizedDocumentView.name);
			}
			else{
				showModal(AutorizedLetterImageView.name);
			}
		}
		catch(ex)
		{
			showAlert("Error View the Owership Certificate",ex);
			throw ex;
		} 
	},
	async previewIdentificationProof(){
		try{
			let TableImageData= await GetRightHolderInfo.data[0].document;
			let mineType= await this.checkBase64FileType(TableImageData);
			if(mineType.includes("pdf"))
			{
				showModal(IdentificationProofDocument.name);
			}
			else{
				showModal(IdentificationProofImageView.name);
			}
		}
		catch(ex)
		{
			showAlert("Error View the Owership Certificate",ex);
			throw ex;
		} 
	}
}