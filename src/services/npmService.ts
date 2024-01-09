import {NpmPackage} from '../types/npmTypes.ts';

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
