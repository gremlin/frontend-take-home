/**
 * SearchResults.tsx
 *
 * This component renders the list of search results based on the npm package query.
 * It displays each result with the package name and description.
 */
import React from 'react';

import {NpmPackage} from '../../types/npmTypes.ts';

import './SearchResults.scss'

/**
 * Interface for SearchResults component props.
 */
interface SearchResultsProps {
    /**
     * results - An array of NpmPackage objects representing search results.
     */
    results: NpmPackage[];
}

/**
 * SearchResults component.
 *
 * This component takes an array of NpmPackage objects as props and renders a list
 * of search results. Each result displays the name and description of the npm package.
 *
 * @param {SearchResultsProps} props - The props for the component.
 */
const SearchResults: React.FC<SearchResultsProps> = ({results}: SearchResultsProps) => {
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