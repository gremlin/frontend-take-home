import React from 'react';

import {NpmPackage} from '../../types/npmTypes.ts';


interface SearchResultsProps {
    results: NpmPackage[];
}

const SearchResults: React.FC<SearchResultsProps> = ({results}) => {
    return (
        <div>
            {results.map((npmPackage: NpmPackage, index: number) =>
                <div key={index}>
                    <h2>{npmPackage.package.name}</h2>
                    <h5>{npmPackage.package.description}</h5>
                </div>
            )}
        </div>
    )
}

export default SearchResults;