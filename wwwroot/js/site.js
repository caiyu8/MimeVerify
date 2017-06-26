; ((win, doc, $) => {
    'use strict'

    let $file = $('#file1')
        , $filename = $('#fn')
        , $bytesDecimal = $('#binaryValue')
        , $bytesHex = $('#hexValue')
        , $fileType = $('#mimetype')
        , $button=$('#btn1')

    const handleFileTYpe = (view) => {
        let first4Bytes = view.getUint32(0, false);
        let first4BytesHex = Number(first4Bytes).toString(16).toUpperCase()

        var count = 0
        while (count < 4) {
            var int8 = view.getUint8(count, false)
            count++
        }

        // show decimal value of bytes
        $bytesDecimal.text('Bytes(decimal): '+first4Bytes)
        // show hex value of bytes
        $bytesHex.text('Bytes (hex): '+first4BytesHex)

        switch (first4BytesHex) {
            case 'FFD8FFE0':
            case 'FFD8FFE1':
            case 'FFD8FFE2':
            case 'FFD8FFE3':
                $fileType.text('MimeType: '+'image/jpeg'); break;
            case '89504E47':
                $fileType.text('MimeType: ' +'image/png'); break;
            case '47494638':
                $fileType.text('MimeType: ' +'image/gif'); break;
            default:
                $fileType.text('MimeType: ' +'other MIME type'); break;
        }
    }

    const handleFileType = (file) => {
        let FR = new FileReader()
        FR.onload = (e) => {
            let af = e.target.result
                , view = new DataView(af);

            handleFileTYpe(view);
        }
        FR.readAsArrayBuffer(file)
    }

    $file.on('change', (e) => {
        $filename.text('File name: '+ e.target.files[0].name); //show file name
        //console.log(`file type is ${e.target.files[0].type}`);
        //console.log(`file name is ${e.target.files[0].name}`);

        $button.show();

        handleFileType(e.target.files[0]);

    })

})(window, document, jQuery)