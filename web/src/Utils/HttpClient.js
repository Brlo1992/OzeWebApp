class HttpClient {
    Send = async (url, callback) => {
        try {
            let rawResponse = await fetch(url);
            let response = await rawResponse.json();

            console.log(response);

            callback(response);

        } catch (error) {
            alert(error);
        }
    }

    SendWithData = async (url, request, callback) => {
        try {
            let rawResponse = await fetch(url, request);
            let response = await rawResponse.json();
            
            console.log(response)
            callback(response);

        } catch (error) {
            console.log(error);
        }
    }
}

export default new HttpClient();