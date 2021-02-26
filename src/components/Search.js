import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Search = () => {
    
    const[term, setTerm] = useState('programming');
    const[debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    //When the component first renders this function will run and set a timer in order to change the debouncedTimer
    //if something is input, which will change the term param, then the timer clears
    useEffect( () => {
        const timerId = setTimeout( () => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    //This will make a request to the api whenever the component rerenders if the term state changed.
    //This function will run when component renders but also when debouncedTerm is modified and the timer from the previous 
    //useEffect has completed. 
    //Also if the same word is input in the search, this will not run, since the debouncedTerm still remains the same value.
    useEffect( () => {
        const search = async () => {
           const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            });
            setResults(data.query.search);
        };
        
        search();

    }, [debouncedTerm]);

    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>
                        Read Article
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter search term</label>
                    <input 
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input"
                    />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
};

export default Search;