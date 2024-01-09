import React, {useState} from 'react';

import SearchForm from '../components/SearchForm/SearchForm.tsx';
import SearchResults from '../components/SearchResults/SearchResults.tsx';
import {searchNpmPackages} from '../services/npmService.ts';
import {NpmPackage} from '../types/npmTypes.ts';

const Search: React.FC = () => {

    const [searchResults, setSearchResults] = useState<NpmPackage[]>([]);

    const handleSearch = async (query: string): Promise<void> => {
        try {
            const response: NpmPackage[] = await searchNpmPackages(query);
            setSearchResults(response);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <div>
            <SearchForm onSearch={handleSearch}/>
            <SearchResults results={searchResults} />
        </div>
    )
}

export default Search;