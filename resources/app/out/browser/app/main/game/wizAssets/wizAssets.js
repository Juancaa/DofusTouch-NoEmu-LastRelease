"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = global.nodeRequire('fs-extra');
const https = global.nodeRequire('https');
const { app } = global.nodeRequire('electron');
class WizAssets {
    constructor(cachePath, http) {
        this.cachePath = cachePath;
        this.http = http;
    }
    getFileExtension(file) {
        return (/[.]/.exec(file)) ? /[^.]+$/.exec(file)[0] : undefined;
    }
    initialize(success, fail) {
        success();
    }
    downloadFile(remoteURL, assetId, success, fail) {
        let filePath = this.cachePath + "/" + assetId;
        fs.exists(filePath, (exists) => {
            if (exists) {
                return success(filePath);
            }
            fs.ensureFile(filePath, (err) => {
                if (err) {
                    console.log(err);
                    return fail(err);
                }
                let f = fs.createWriteStream(filePath);
                https.get(remoteURL, function (res) {
                    res.on('data', (chunk) => {
                        f.write(chunk);
                    });
                    res.on('end', () => {
                        f.end();
                    });
                    res.on('error', (err) => {
                        console.log(err);
                        return fail(err);
                    });
                }).on('error', (err) => {
                    console.log(err);
                    console.log(remoteURL);
                    console.log('retry');
                    return this.downloadFile(remoteURL, assetId, success, fail);
                });
                f.on('error', (err) => {
                    console.log(err);
                    return fail(err);
                });
                f.on('close', (err) => {
                    return success(filePath);
                });
            });
        });
    }
    deleteFile(assetId, success, fail) {
        let filePath = this.cachePath + "/" + assetId;
        console.log('deleteFile');
        fs.exists(filePath, function (exists) {
            if (exists) {
                fs.remove(filePath, (err) => {
                    if (err)
                        return fail(err);
                    success();
                });
            }
            else {
                success();
            }
        });
    }
    deleteFiles(assetIds, success, fail) {
        assetIds.forEach((assetId) => {
            this.deleteFile(assetId, success, fail);
        });
    }
    getFileURI(assetId, success, fail) {
        throw new Error('getFileURI not implemented');
    }
    getFileURIs(success, fail) {
        throw new Error('getFileURIs not implemented');
    }
}
exports.WizAssets = WizAssets;

//# sourceMappingURL=wizAssets.js.map
