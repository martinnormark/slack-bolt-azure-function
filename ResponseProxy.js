class ResponseProxy {
    constructor() {
        this.data = null;
        this.promise = new Promise((resolve) => this.resolve = resolve);
    }

    convertToBody(body, encoding) {
        return Buffer.isBuffer(body)
          ? body.toString(encoding)
          : body;
    }

    writeHead(statusCode, statusMessage, headers) {
        console.log(statusCode);
    }
    
    end(data, encoding) {
        if (data) {
            this.data = JSON.parse(this.convertToBody(data, encoding));
        }

        this.resolve();
    }

    async getResponse() {
        await this.promise;
        console.log("data", this.data);

        return {
            body: this.data
        }
    }
}

module.exports = ResponseProxy;
