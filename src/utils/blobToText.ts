// utils/captcha.ts
import Tesseract from 'tesseract.js';

/**
 * Extracts text from a CAPTCHA image blob using Tesseract.js
 */
export const extractTextFromCaptchaBlob = async (
  blob: Blob,
): Promise<string> => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(blob, 'eng', {
      logger: (m: any) => console.log(m),
    });

    return text.trim();
  } catch (error) {
    console.error('Tesseract OCR failed:', error);
    throw error;
  }
};
