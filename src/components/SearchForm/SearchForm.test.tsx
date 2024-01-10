import React from 'react';

import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';

import SearchForm from './SearchForm';

describe('SearchForm Component', () => {
    it('renders the search form', () => {
        render(<SearchForm onSearch={jest.fn()}/>);

        expect(screen.getByPlaceholderText('Search npm packages')).toBeInTheDocument();
    });

    it('allows users to enter a search query', () => {
        render(<SearchForm onSearch={jest.fn()}/>);
        const input: HTMLInputElement = screen.getByPlaceholderText('Search npm packages');
        fireEvent.change(input, {target: {value: 'test'}});

        expect(input.value).toBe('test');

    });

    it('calls onSearch when the form is submitted', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm onSearch={mockOnSearch}/>);
        const input: HTMLInputElement = screen.getByPlaceholderText('Search npm packages');
        fireEvent.change(input, {target: {value: 'react'}});
        fireEvent.submit(screen.getByRole('button'));

        expect(mockOnSearch).toHaveBeenCalledWith('react');
    });
});
