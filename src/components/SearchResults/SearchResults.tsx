import React from 'react';

import {NpmPackage} from '../../types/npmTypes.ts';

import './SearchResults.scss'

interface SearchResultsProps {
    results: NpmPackage[];
}

const SearchResults: React.FC<SearchResultsProps> = ({results}) => {
    return (
        <div className="search-results__container">
            {results.map((npmPackage: NpmPackage, index: number) =>
                <div className="search-result__container" key={index}>
                    <h2>{npmPackage.package.name}</h2>
                    <h5 className="search-result__description">{npmPackage.package.description}</h5>
                </div>
            )}
        </div>
    )
}

export default SearchResults;