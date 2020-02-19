/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
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
  
  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
  }
  
  /**
  * Create a PDF file according to its database64 content only.
  * 
  * @param folderpath {String} The folder where the file will be created
  * @param filename {String} The name of the file that will be created
  * @param content {Base64 String} Important : The content can't contain the following string (data:application/pdf;base64). Only the base64 string is expected.
  */
  function savebase64AsPDF(folderpath,filename,content,contentType){
  // Convert the base64 string in a Blob
  var DataBlob = b64toBlob(content,contentType);
  
  console.log("Starting to write the file :3");
  
  window.resolveLocalFileSystemURL(folderpath, function(dir) {
    console.log("Access to the directory granted succesfully");
  dir.getFile(filename, {create:true}, function(file) {
        console.log("File created succesfully.");
        file.createWriter(function(fileWriter) {
            console.log("Writing content to file");
            fileWriter.write(DataBlob);
        }, function(){
            alert('Unable to save file in path '+ folderpath);
        });
  });
  });
  }
  
  
//   function generated(){
//     /** Process the type1 base64 string **/
//     var doc = new jsPDF();
//     // doc.addPage();
//     doc.text(20, 20, 'Hello world!');
//     doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
  
//     // Making Data URI
//     var out = doc.output();
//     var url = "data:application/pdf;base64," + btoa(out);
//     console.log(url);
//   // var myBaseString = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";
  
//   // Split the base64 string in data and contentType
//   var block = url.split(";");
//   // Get the content type
//   var dataType = block[0].split(":")[1];// In this case "application/pdf"
//   // get the real base64 content of the file
//   var realData = block[1].split(",")[1];// In this case "JVBERi0xLjcKCjE...."
  
//   // The path where the file will be created
//   var folderpath = "file:///storage/emulated/0/";
//   // The name of the PDF
//   var filename = "mypdf.pdf";
  
//   savebase64AsPDF(folderpath,filename,realData,dataType);
//   }