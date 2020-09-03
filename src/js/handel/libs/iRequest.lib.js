
const iRequest = {
    then(response, notify) {
        var content = {};
        content.message = 'The operation was successful.';
        let data = response.data.data;
        let parent = {};
        let additional = response.data.additional ? response.data.additional : {};
        let links = response.data.links ? response.data.links : {};
        let meta = response.data.meta ? response.data.meta : {};
        if (meta.parent) {
            parent = response.data[meta.parent];
        }
        let message = response.data.message || response.message;
        let message_text = response.data.message_text || response.message_text;
        if (notify) BitNotify(content, {type: 's'})
        return {status: true ,message: message, message_text: message_text, data: data, parent: parent, additional: additional, meta: meta, links: links};
    },
    catch(response) {

    }
};

export default iRequest;
