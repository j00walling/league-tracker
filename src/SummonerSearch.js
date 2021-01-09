import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const [info, setInfo] = useState({
    accountId: null,
    profileIconId: null,
    revisionDate: null,
    name: null,
    id: null,
    puuid: null,
    summonerLevel: null,
  });

  const getInfo = async (q) => {
    try {
      const apiRes = await fetch(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${q}?api_key=RGAPI-2b58355d-d9b3-403e-94bf-a9f7853d0677`
      );
      const resJSON = await apiRes.json();
      setInfo({
        accountId: resJSON.accountId,
        profileIconId: resJSON.profileIconId,
        revisionDate: resJSON.revisionDate,
        name: resJSON.name,
        id: resJSON.id,
        puuid: resJSON.puuid,
        summonerLevel: resJSON.summonerLevel,
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getInfo(query);
  };

  return (
    <div>
      <form>
        <input onChange={(e) => setQuery(e.target.value)} />
        <button onClick={(e) => handleSearch(e)}>Submit</button>
        {error ? (
          <h1>There was an error</h1>
        ) : (
          <div>
            <h1>Account ID: {info.accountId}</h1>
            <h1>profileIconId: {info.profileIconId}</h1>
            <h1>revision Date: {info.revisionDate}</h1>
            <h1>Name: {info.name}</h1>
            <h1>ID: {info.id}</h1>
            <h1>puuid: {info.puuid}</h1>
            <h1>summonerLevel: {info.summonerLevel}</h1>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
