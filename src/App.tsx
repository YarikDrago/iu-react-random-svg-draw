import React from 'react';
import RandomSvg from "@/RandomSvg";
import snowFlake2 from "../assets/img/snow2.svg";

const App = () => {
    return (
        <div>
            <RandomSvg
                amount={2}
                minLifetimeMs={500}
                maxLifetimeMs={1000}
                userImages={[snowFlake2]}
            />
        </div>
    );
};

export default App;
