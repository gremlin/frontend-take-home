/**
 * SearchForm.tsx
 *
 * This component provides a search input form for querying npm packages.
 * It includes an input field to enter the search query and a submit button.
 */
import React, {useState} from 'react';

import './SearchForm.scss'

/**
 * Interface for SearchForm component props.
 */
interface SearchFormProps {
    // onSearch: Function to be called with the search query when the form is submitted
    onSearch: (query: string) => void;
}

/**
 * SearchForm component.
 *
 * This component renders a form with an input field for searching npm packages.
 *  * It uses local state to manage the input value and calls the onSearch prop
 *  * when the form is submitted.
 * @param {SearchFormProps}  The props for the component.
 * @constructor
 */

const SearchForm: React.FC<SearchFormProps> = ({onSearch}: SearchFormProps) => {
    // State to store the current value of the search input.
    const [query, setQuery] = useState<string>('');

    /**
     * handleInputChange - Event handler for input changes.
     * Updates the query state with the current input value.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event on the input element.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
    };

    /**
     * handleSubmit - Event handler for form submission.
     * Prevents the default form behavior and calls the onSearch function.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onSearch(query)
    };

    // Render the search form with an input field and submit button.
    return (
        <div className="search-form__container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search npm packages"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchForm;