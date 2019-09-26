## MimeVerify : Proof-of-Concept client side MIME type verification

File upload is a common task in web applications and it’s important to validate user uploaded files before doing anything. Normally this is done on the server side and is often very tedious to implement.

The aim of this project is to explore the **HTML5 FileReader API** and detect the **MIME type** of a user selected file on the browser side before uploading it to the server.

The goal is to read a local file using native JavaScript (ES6) and verify the file’s unique **File Signature** (also known as **Magic Number**) in order to determine the file’s real MIME type even if its file extension has been modified.

Here are the brief steps:
1.	First, catch the *input[type=’file’].onchange* event, then call FileReader’s *readAsArrayBuffer()* method, and transfer the file to ArrayBuffer.
2.	User DataView to transfer ArrayBuffer to readable objects.
3.	Read the first four bytes (maginc number)
4.	From a list of file signatures, search the corresponding MIME type, such as:

``` javascript
switch (first4BytesHex) {
case 'FFD8FFE0':
case 'FFD8FFE1':
case 'FFD8FFE2':
case 'FFD8FFE3':
$fileType.text('MimeType: '+'image/jpeg'); break; case '89504E47':
$fileType.text('MimeType: ' +'image/png'); break; case '47494638':
$fileType.text('MimeType: ' +'image/gif'); break; default:
$fileType.text('MimeType: ' +'other MIME type'); break;
}
```

5.	Upload only files with allowed MIME types
 
References:
1.	[Wiki: Magic numbers](https://en.wikipedia.org/wiki/Magic_number_%28programming%29)
2.	[Wiki: List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)
3.	[Mozilla: TypedArray or DataView: Understanding byte order](https://hacks.mozilla.org/2017/01/typedarray-or-dataview-understanding-byte-order/)
4.	[Mozilla: FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
5.	[Mozilla: A cartoon intro to SharedArrayBuffers](https://hacks.mozilla.org/2017/06/a-cartoon-intro-to-arraybuffers-and-sharedarraybuffers/)
6.	[Google: Reading local files in JavaScript](https://www.html5rocks.com/en/tutorials/file/dndfiles/)
7.	[StackOverflow: Javascript Typed Arrays and Endianness](https://stackoverflow.com/questions/7869752/javascript-typed-arrays-and-endianness)


