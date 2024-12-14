import React from 'react';
import RandomSvg from "@/RandomSvg";

const App = () => {
    return (
        <div>
            <RandomSvg amount={2} minLifetimeMs={500} maxLifetimeMs={1000}/>
        </div>
    );
};

export default App;
