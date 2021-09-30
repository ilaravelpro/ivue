const iBase64 = {
    path: null,
    filename: null,
    content: null,
    contentType: null,
    fileBlob: null,
    save(path, filename, content, contentType) {
        var $this = this;
        $this.path = path;
        $this.filename = filename;
        $this.content = content;
        $this.contentType = contentType;
        $this.fileBlob = this.toBlob($this.content, $this.contentType);
        window.resolveLocalFileSystemURL($this.path, function (dirEntry) {
            $this.createFile(dirEntry, $this.filename, $this.fileBlob, true)
        }, $this.handelError);
    },
    createFile(dirEntry, fileName, dataObj, isAppend) {
        var $this = this;
        dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
            $this.writeFile(fileEntry, dataObj, isAppend);
        }, $this.handelError);
    },
    writeFile(fileEntry, dataObj, isAppend) {
        var $this = this;
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function() {
                $this.openFile(fileEntry);
            };

            fileWriter.onerror = function (e) {
                alert("Failed file open: " + e.toString());
            };

            if (isAppend) {
                try {
                    fileWriter.seek(fileWriter.length);
                }
                catch (e) {
                    alert("file doesn't exist!");
                }
            }
            fileWriter.write(dataObj);
        },$this.handelError);
    },
    openFile(fileEntry) {
        var $this = this;
        cordova.plugins.fileOpener2.open(
            fileEntry.nativeURL,
            $this.contentType,
            {
                error : function(e){
                    $this.handelError(e)
                },
                success : function(){

                }
            }
        );
    },
    handelError: function(e) {
        alert("Failed file write: " + e.toString());
    },
    toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    },
};

export default iBase64;
