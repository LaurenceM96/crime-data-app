import React, { useState, useEffect, reload } from 'react';
import '../styles/Crime.css';

function Crimes(props) {
    const [crimes, setCrimes] = useState(null);
    const [isBusy, setBusy] = useState(false);

    useEffect(() => {
        setBusy(true);
        async function fetchData() {
            // const url = 'https://data.police.uk/api/crimes-street/all-crime?lat=' 
            //             + props.lat + '&lng=' + props.lng
            const url = 'https://data.police.uk/api/crimes-street/all-crime?poly=' 
                        + getPoly(props.lat, props.lng)
            await fetch(url)
            .then(response => response.json())
            .then(setBusy(false))
            .then(data => setCrimes(data));
        }
        
        if (props.lng != null && props.lat != null) {
            fetchData();
        }
        console.log(crimes);
    }, [props.lng, props.lat]);

    console.log(props.lat);
    console.log(props.lng);
    console.log(crimes);
    console.log(isBusy);
    if (isBusy || crimes == null || crimes.length == 0) {
         return null;
    }

    return (
        <div>
            <h3>Crime Data</h3>
            <ul className="Crimes">
                {crimes && crimes.map((crime, idx) => (
                    <div className="Crime" key={idx}>
                        {crime.hasOwnProperty('category') ? 
                        (<p>Category: {crime.category}<br/></p>) : 
                        (<p>No category recorded<br/></p>)
                        }
                        {crime.hasOwnProperty('location') ? 
                        (<p>Location: {crime.location.street.name}<br/></p>) : 
                        (<p>No location recorded<br/></p>)
                        }
                        {crime.outcome_status != null ? 
                        (<p>Outcome Status: {crime.outcome_status.category}<br/></p>) : 
                        (<p>No outcome recorded<br/></p>)
                        }
                    </div>
                ))}
            </ul>
        </div>
    );
}

function getPoly(lat, lng) {
    var returnStr = "";
    const diff = 1/300;

    returnStr += lat-diff + ",";
    returnStr += lng+diff + ":";

    returnStr += lat-diff + ",";
    returnStr += lng-diff + ":";

    returnStr += lat+diff + ",";
    returnStr += lng-diff + ":";

    returnStr += lat+diff + ",";
    returnStr += lng+diff;

    console.log(returnStr);

    return returnStr;
}

export default Crimes;