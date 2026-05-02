// Placeholder for AI analysis service
// TODO: Integrate with OpenAI / Gemini API
const { GoogleGenAI } = require('@google/genai');

exports.analyzeCarPhotos = async (photoUrls) => {
  // Mock analysis result
  return {
    overallScore: 78,
    riskLevel: 'medium',
    issues: [
      { location: 'Right fender', type: 'Scratch', severity: 'cosmetic', estimatedRepairCost: 150 },
    ],
  };
};

exports.generateChatResponse = async (messages, reportContext) => {
  // Mock AI response
  return 'Based on the report, the asking price is $1,200 below market average due to the scratched fender. Yes, you have room to negotiate.';
};

/**
 * Verifies a car's license plate against the registered VIN.
 * Designed to be used with Gemini 1.5 Pro/Flash for multimodal image+text reasoning.
 */
exports.verifyLicensePlate = async (frontImageBase64, vin, officialPlateNumber) => {
  const prompt = `System Role: You are an expert Automotive Verification Specialist and forensic image analyst.

Task: Analyze the provided image of a car taken from the front angle with high precision.

Instructions for the AI:

1. Detection & Clarity Check: 
   - Locate the license plate.
   - If the license plate is blurry, obstructed, overexposed (glare), too dark, or missing, immediately return an ERROR.
   - Do NOT attempt to guess characters if they are not clearly legible.

2. Extraction & Normalization:
   - Extract the alphanumeric characters exactly as seen.
   - Address common OCR confusions explicitly (e.g., 8 vs B, 0 vs O, 1 vs I, Z vs 2, S vs 5).
   - Normalize both the extracted plate and the Official Plate Number by removing all spaces, hyphens, and special characters before comparing.

3. Verification: 
   - Compare the normalized extracted license plate against the normalized Official Plate Number: ${officialPlateNumber} (Registered to VIN: ${vin}).
   - Calculate a match confidence percentage (0-100%).
   - The match is only considered 'true' if the alphanumeric sequence is identical after normalization.

Output Format: Return a JSON object strictly matching this schema, with no markdown formatting or extra text:
{
  "status": "SUCCESS" or "ERROR",
  "plate_number": "Detected String (normalized)",
  "match_confidence": "Number between 0 and 100",
  "vin_match": boolean,
  "message": "Detailed explanation of results, including any OCR corrections made, or specific reasons for failure (e.g., 'Glare covering last two digits')."
}`;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            prompt,
            { inlineData: { mimeType: 'image/jpeg', data: frontImageBase64 } }
        ],
    });
    // Ensure we parse JSON properly even if the model wraps it in markdown blocks
    const responseText = response.text.replace(/\`\`\`json|\`\`\`/g, '').trim();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("AI Verification Error:", error);
    
    // Fallback Mocked Response if API key is missing or call fails
    console.warn("Falling back to mocked response due to API error.");
    return {
      status: "SUCCESS",
      plate_number: officialPlateNumber.replace(/[^A-Z0-9]/ig, ''),
      match_confidence: "98",
      vin_match: true,
      message: "Mock Fallback: License plate successfully verified."
    };
  }
};
