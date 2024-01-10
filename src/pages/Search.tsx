/**
 * Search.tsx
 *
 * This component serves as the main search interface for the application. It includes
 * the search form, handles the logic for fetching search results, and displays either
 * a loading spinner or the search results based on the state.
 */
import React, {useState} from 'react';

import SearchForm from '../components/SearchForm/SearchForm.tsx';
import SearchResults from '../components/SearchResults/SearchResults.tsx';
import Spinner from '../components/Spinner/Spinner.tsx';
import {searchNpmPackages} from '../services/npmService.ts';
import {NpmPackage} from '../types/npmTypes.ts';

import './Search.scss'

/**
 * Search component.
 *
 * This component manages the state for search results and loading status. It renders the
 * SearchForm component and, based on the state, either the Spinner or SearchResults component.
 * It uses the searchNpmPackages service function to fetch search results based on the user's query.
 */
const Search: React.FC = () => {

    const [searchResults, setSearchResults] = useState<NpmPackage[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    /**
     * handleSearch - Fetches search results based on the query.
     *
     * This function is triggered when the search form is submitted. It sets the loading state,
     * calls the searchNpmPackages service function, updates the search results state with the
     * response, and handles any errors that might occur during the process.
     *
     * @param {string} query - The search query string.
     */
    const handleSearch = async (query: string): Promise<void> => {
        try {
            setLoading(true)
            const response: NpmPackage[] = await searchNpmPackages(query);
            setSearchResults(response);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false)
        }
    };

    // Render the search interface, including the form, spinner, and results.
    return (
        <div className="search__container">
            <SearchForm onSearch={handleSearch}/>
            { loading ? <Spinner /> : <SearchResults results={searchResults} />}
        </div>
    )
}

export default Search;