import React, {useState} from 'react';

import SearchForm from '../components/SearchForm/SearchForm.tsx';
import SearchResults from '../components/SearchResults/SearchResults.tsx';
import Spinner from '../components/Spinner/Spinner.tsx';
import {searchNpmPackages} from '../services/npmService.ts';
import {NpmPackage} from '../types/npmTypes.ts';

import './Search.scss'

const Search: React.FC = () => {

    const [searchResults, setSearchResults] = useState<NpmPackage[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

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

    return (
        <div className="search__container">
            <SearchForm onSearch={handleSearch}/>
            { loading ? <Spinner /> : <SearchResults results={searchResults} />}
        </div>
    )
}

export default Search;