import { callGemini } from './lib/ai-wrapper';
const pancardContext = `From the pan card image get me the detail in JSON format. Include confidence score of image is pan card 
  JSON format example:
  {
  "confidence": 0.95,
  "document_type": "pan_card",
  "fields": {
    "name": "ARUN BARGESH",
    "pan_number": "FFMPB8641J",
    "date_of_birth": "02/04/1995"
  }
}
`;

const aadhaarContext = `From the aadhaar card image get me the detail in JSON format. 
Include confidence score of image is a valid card 
  JSON format example:
  {
  "confidence": 0.95,
  "document_type": "aadhaar_card",
  "fields": {
      "name": "ARUN BARGESH",
      "hindi_name": "अरूण बर्गेश",
      "gender": "MALE",
      "aadhaar_number": "FFMPB8641J",
      "dob": "02/04/1995",
      "issue_date": "02/04/1995",
      "vid": "123456789"
    }
}
`;
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node main.js <user_text> <user_image>');
  process.exit(1);
}
const userImage = args[0];
console.log({ userText: aadhaarContext, userImage, args });
callGemini(aadhaarContext, userImage);
