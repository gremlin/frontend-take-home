import React, {useState} from 'react';

function SearchForm(): React.JSX.Element {
    const [query, setQuery] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search npm packages"
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;