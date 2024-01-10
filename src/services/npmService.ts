/**
 * npmService.ts
 *
 * This service file contains functions for making API calls related to npm packages.
 * It includes functions to search for npm packages using the npms.io API.
 */
import {NpmPackage} from '../types/npmTypes.ts';


/**
 * searchNpmPackages - Fetches npm package suggestions based on a search query.
 *
 * This function makes an HTTP GET request to the npms.io API to retrieve package
 * suggestions based on the provided query string. It returns an array of NpmPackage
 * objects containing information about each suggested package.
 *
 * @param {string} queryString - The search term used to query the npms.io API.
 * @returns {Promise<NpmPackage[]>} A promise that resolves to an array of NpmPackage objects.
 */
const searchNpmPackages = async (queryString: string): Promise<NpmPackage[]> => {
    const NPM_SEARCH_URL: string = `https://api.npms.io/v2/search/suggestions?q=${encodeURIComponent(queryString)}`;
    try {
        const response: Response = await fetch(NPM_SEARCH_URL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json() as NpmPackage[];
    } catch (error) {
        console.error('Failed to fetch npm packages:', error);
        throw error;
    }
};

export { searchNpmPackages };
