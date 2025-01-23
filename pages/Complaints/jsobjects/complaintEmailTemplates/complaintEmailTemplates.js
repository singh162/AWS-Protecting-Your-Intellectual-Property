export default {
	emailTemplate() {
		const emailComplaintTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Complaint Registration</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 20px;
        }
        .content {
          margin: 20px 0;
        }
        .details {
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          padding: 10px;
          margin: 20px 0;
        }
        .infringement-item {
          margin-bottom: 10px;
        }
        .signature {
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="content">
        <p>Dear Saip Team,</p>
					<p>The user <strong>${appsmith.store.signUpRightHolderName} </strong> register a complaint regarding the infringement of my work. Below are the details:</p>
        <div class="details">
          <p><strong>Category:</strong> ${Select2.selectedOptionLabel}</p>
          <p><strong>Original Work / Copyright URL:</strong> ${originalWork.text}</p>
          <p><strong>Content Title:</strong> ${Select3.selectedOptionLabel}</p>

          <!-- Dynamic Infringing Details -->
          ${AddListInput.listArray.map(item => `
            <div class="infringement-item">
              <p><strong>Infringing URL:</strong> ${item.input1}</p>
              <p><strong>Description:</strong> ${item.Description}</p>
            </div>
          `).join('')}
        </div>
        <p>Attached are the supporting screenshots or documents as proof of infringement.
				The name of the attachment matches the infrining URL name, so you can easily identify which attachment corresponds to each infrining UR.</p>
        <p>I kindly request you to investigate this matter and take appropriate action as per your policy.</p>
        <p>If you need further information, feel free to reach out to me.</p>
        <p>Thank you for your prompt attention to this matter.</p>
        <div class="signature">
          Best regards,<br><br>
          ${appsmith.store.signUpRightHolderName}<br>
          ${appsmith.store.signUpRightHolderEmail}<br>
        </div>
      </div>
    </body>
    </html>
    `;
		return emailComplaintTemplate;
	}
};
