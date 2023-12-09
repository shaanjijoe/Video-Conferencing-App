const convertToBase64 = (file) => {
    try{
    return new Promise((resolve,reject)=> {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload= () => {
            resolve(fileReader.result)  
        };

        fileReader.onerror = (error) => {
            console.error("Error reading file:", error);
            resolve(null); 
        }
    });
    } catch(err){
        console.log("Error in converting");
        return null;
    }
}

export default convertToBase64;

// The Promise is designed to resolve with the Base64 string upon successful loading (onload) or 
// reject with an error in case of any issues (onerror). 