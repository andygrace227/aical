
class Backend {

    constructor() {
        this.TEXT_ENDPOINT = "https://api.andygrace.space/ai/text/completionStream"
    }

    /**
     * Communicate with my AI endpoint to run LLM operations.
     * @param {*} prompt - the system prompts
     * @param {*} chats - the chats so far
     * @returns a readable stream of the text returned by the LLM.
     */
    async streamText(prompt, chats) {
        try {
            const API_ARGS = {
                    provider: "novita",
                    model: "meta-llama/Llama-3.3-70B-Instruct",
                    messages: [
                        {
                            role: "system",
                            content:  prompt
                        },
                        ...chats
                    ]
                };

            let api_resp = await fetch(this.TEXT_ENDPOINT, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(API_ARGS)
            });
            console.log(api_resp)
            return api_resp.body;
        } catch (err) {
            console.log(err);
            return "API Backend Error. Please wait a while."
        }
    }

}

export default Backend;
