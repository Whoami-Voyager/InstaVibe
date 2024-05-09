import { useState } from "react";

function Search({ otherUser }) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const usernames = otherUser.map((user) => user.username);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const otherUsers = usernames.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(otherUsers);
        setShowSuggestions(otherUsers.length > 0 && value.trim().length > 0);
    };

    const handleSelectSuggestion = (value) => {
        setInputValue(value);
        setShowSuggestions(false);
    };

    return (
        <div className="flex flex-col h-16 w-3/5">
            <input
                className="w-3/5 mx-auto mt-14 text-center m-9 border-2 rounded-lg shadow-lg hover:border-gray-400"
                id="search"
                autoComplete="off"
                placeholder="Search 🔎"
                value={inputValue}
                onChange={handleChange}
            />
            {showSuggestions && (
                <ul className="mx-auto bg-white border rounded-lg w-64">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;
