import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                let response;
                if (location.pathname.includes('/search/users')) {
                    response = await axios.get(`/api/users/search?query=${query}`);
                } else {
                    response = await axios.get(`/api/posts/search?query=${query}`);
                }
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [location.pathname, query]);

    return (
        <div>
            <h1>Search Results</h1>
            <div>
                {results.map(result => (
                    <div key={result.id}>
                        <h2>{result.name || result.title}</h2>
                        <p>{result.location || result.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
