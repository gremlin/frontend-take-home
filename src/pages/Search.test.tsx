import React from 'react';

import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';

import {searchNpmPackages} from '../services/npmService';
import {NpmPackage} from '../types/npmTypes.ts';

import Search from './Search';


jest.mock('../services/npmService', () => ({
    searchNpmPackages: jest.fn(),
}));

describe('Search Component', () => {
    it('renders the search form initially', () => {
        render(<Search/>);

        expect(screen.getByPlaceholderText('Search npm packages')).toBeInTheDocument();
    });

    it('displays a spinner when search is in progress', async () => {
        searchNpmPackages.mockImplementation(() => new Promise(() => {
        }));
        render(<Search/>);
        const input = screen.getByPlaceholderText('Search npm packages');
        fireEvent.change(input, {target: {value: 'react'}});
        fireEvent.submit(input);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('displays an error message if the search fails', async () => {
        searchNpmPackages.mockRejectedValue(new Error('Network error'));
        render(<Search/>);
        const input: HTMLInputElement = screen.getByPlaceholderText('Search npm packages');
        fireEvent.change(input, {target: {value: 'error'}});
        fireEvent.submit(input);
        await waitFor(() => {
            expect(screen.getByText('Failed to fetch search results.')).toBeInTheDocument();
        });
    });

    it('displays search results if the search succeeds', async () => {
        const mockResults: NpmPackage[] = [
            {
                package: {
                    name: 'Test package name',
                    version: '1',
                    description: 'Test Package'
                }
            },
            {
                package: {
                    name: 'Test-paleczny package name',
                    version: '1',
                    description: 'Test Paleczny Package'
                }
            }
        ]
        searchNpmPackages.mockResolvedValue(mockResults);
        render(<Search/>);
        const input: HTMLInputElement = screen.getByPlaceholderText('Search npm packages');
        fireEvent.change(input, {target: {value: 'react'}});
        fireEvent.submit(input);
        await waitFor(() => {
            expect(screen.getByText('Test package name')).toBeInTheDocument();
            expect(screen.getByText('Test-paleczny package name')).toBeInTheDocument();
        });
    });
});
