class Utils {
    static async waitPromise(response){
        if(response instanceof Promise) response = await response;
        return response;
    }
}

module.exports = Utils;