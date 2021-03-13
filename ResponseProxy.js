class ResponseProxy {
    constructor() {
        this.data = null;
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
        console.log("parsing", data);
        if (data) {
            this.data = JSON.parse(data);
        }
    }

    getResponse() {
        console.log("data", this.data);

        return {
            body: this.data
        }
    }
}

module.exports = ResponseProxy;
