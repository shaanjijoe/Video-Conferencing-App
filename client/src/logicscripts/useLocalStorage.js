import { useState } from "react";

const useLocalStorage = (key, defVal) =>
{
    const [storedval, setStoredVal] = useState(() => {
        try {
            const value = window.localStorage.getItem(key);

            if(value){
                return JSON.parse(value);
            } 
            else{
                window.localStorage.setItem(key, JSON.stringify(defVal));
                return defVal;
            }
        } catch(err) {
            return defVal;
        }});

        const setVal = (newVal) => {
            try{
                window.localStorage.setItem(key, JSON.stringify(newVal));
            } 
            catch (err) 
            {}
            setStoredVal(newVal);
            };
            return [storedval, setVal];
};

export default useLocalStorage
    
