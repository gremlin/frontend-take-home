import React from 'react';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import {NpmPackage} from '../../types/npmTypes.ts';

import SearchResults from './SearchResults';

describe('SearchResults Component', () => {
    it('renders the search form', () => {
        const mockSearchResults: NpmPackage[] = [
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
        render(<SearchResults results={mockSearchResults}/>);

        expect(screen.getByText('Test package name')).toBeInTheDocument();
        expect(screen.getByText('Test-paleczny package name')).toBeInTheDocument();
    });
});
