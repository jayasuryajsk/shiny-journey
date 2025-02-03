import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

console.log('[processPdf Module] lib/pdfProcessor loaded');

/**
 * Processes a PDF file and prepares it for chat interaction.
 *
 * @param filePath - The path to the PDF file.
 * @param prompt - The question or prompt to ask about the PDF content.
 * @returns The attachment object ready for chat.
 */
export async function processPdf(filePath: string, prompt: string): Promise<string> {
  console.log('Starting PDF processing...', { filePath, prompt });
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist:', filePath);
      throw new Error(`File not found: ${filePath}`);
    }
    console.log('[processPdf] - File exists, proceeding with file read.');

    // Read the PDF file data synchronously
    const fileBuffer = fs.readFileSync(filePath);
    console.log(`PDF loaded successfully. File size: ${fileBuffer.length} bytes`);
    console.log(`[processPdf] - Read fileBuffer of length ${fileBuffer.length}`);
    
    const fileName = path.basename(filePath);
    console.log('Processing file:', fileName);
    console.log(`[processPdf] - File name determined: ${fileName}`);

    // Convert buffer to base64 data URL
    const dataUrl = `data:application/pdf;base64,${fileBuffer.toString('base64')}`;
    console.log('PDF converted to data URL. Length:', dataUrl.length);
    console.log(`[processPdf] - Data URL generated, length: ${dataUrl.length}`);

    // Create the attachment object (no longer used for separate upload)
    const attachment = {
      name: fileName,
      url: dataUrl,
      contentType: 'application/pdf'
    };
    console.log('[processPdf] - Attachment object created:', attachment);

    // Instead of uploading the file separately, we include the file data directly in the chat message
    console.log('[processPdf] - Preparing to send chat message with PDF attachment using direct file input');

    // Send the chat message with the file included as part of the content array
    const chatResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: prompt,
          attachments: [{
            name: fileName,
            url: dataUrl,
            contentType: 'application/pdf'
          }],
          experimental_attachments: [{
            name: fileName,
            url: dataUrl,
            contentType: 'application/pdf',
            extra: { geminiPdf: true }
          }]
        }]
      })
    });

    if (!chatResponse.ok) {
      throw new Error('Failed to send chat message');
    }

    const chatData = await chatResponse.json();
    console.log('Chat response received:', chatData);
    console.log(`[processPdf] - Chat message sent successfully, response payload:`, chatData);

    // Add validation for extracted text
    if (!chatData.text || chatData.text.trim().length === 0) {
      throw new Error('PDF text extraction returned empty content');
    }
    
    return chatData.text;
  } catch (error) {
    console.error('Error in processPdf:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined
    });
    throw new Error('Failed to process PDF file');
  }
} 