// src/services/sheetsService.js

// Fetch variables from the environment file (.env)
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;

// Define the data range we want to retrieve (from column A to the end)
const RANGE = "A1:Z";

const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

/**
 * Fetches all hole data from the Google Sheet and processes it into an array of objects.
 * @returns {Promise<Array>} Array of hole objects.
 */
export const fetchAllHolesData = async () => {
    if (!API_KEY || !SPREADSHEET_ID) {
        console.error("API Key or Spreadsheet ID is missing from .env file.");
        return [];
    }

    try {
        const response = await fetch(BASE_URL);
        
        if (!response.ok) {
            // Check for API errors (e.g., key restrictions, sheet not found)
            const errorData = await response.json();
            console.error("Google Sheets API Error:", errorData.error.message);
            return [];
        }

        const data = await response.json();
        const sheetValues = data.values;

        if (!sheetValues || sheetValues.length < 2) {
            console.warn("Sheet is empty or only contains headers.");
            return [];
        }

        // The first row is the header (keys)
        const headers = sheetValues[0];
        // The remaining rows are the data
        const dataRows = sheetValues.slice(1);

        // Map the data rows into an array of objects
        const processedData = dataRows.map(row => {
            const holeObject = {};
            headers.forEach((header, index) => {
                // Trim the header name to avoid space issues during access
                const key = header.trim();
                // Assign the cell value, trimming whitespace from the value too
                holeObject[key] = row[index] ? String(row[index]).trim() : '';
            });
            return holeObject;
        });
        
        return processedData;

    } catch (error) {
        console.error("Network or Fetch Error:", error);
        return [];
    }
};