import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Camera} from "ionic-native";


@Component({
    selector: 'page-imageUpload',
    templateUrl: 'imageUpload.html'
})
export class ImageUploadPage {

    constructor(public navCtrl: NavController) {

    }

    private selectedImage;
    private cantSendImage = true;

    takePicture() {
        var options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            quality: 100,
            allowEdit: false,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

          Camera.getPicture(options).then((imageData) => {

            this.selectedImage = 'data:image/jpeg;base64,' + imageData;
            this.cantSendImage = null;

        }, (err) => {


        });
    }

    uploadPicture() {
        var imageName = (<HTMLInputElement>document.getElementById('photoName')).value;
        if(imageName == null || imageName.trim() == ''){
            alert('Insert the photo name.');
            return;
        }
        //http://ourcodeworld.com/articles/read/150/how-to-create-an-image-file-from-a-base64-string-on-the-device-with-cordova
        // Split the base64 string in data and contentType
        var block = this.selectedImage.split(";");
        var realData = block[1].split(",")[1];

        let blob = this.b64toBlob(realData, 'image/jpeg', 512);

        //let create form data and send it with xhr
        var fd = new FormData();

        fd.append("image", blob, imageName+'.jpg');

        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", this.onProgress, false);
        xhr.open("POST", 'http://45.55.77.201:8083/image', true);
        xhr.send(fd);
    }

    onProgress(e) {
       if (e.lengthComputable) {
           (<HTMLInputElement>document.getElementById('progress')).value = ((e.loaded / e.total) * 100).toString();
           if(e.loaded == e.total){
               alert('Uploaded!');
               (<HTMLInputElement>document.getElementById('photoName')).value = '';
           }
        }
    }

    onError(xhr) {
        alert("network error while uploading.");
        alert(xhr);
    }

//http://ourcodeworld.com/articles/read/150/how-to-create-an-image-file-from-a-base64-string-on-the-device-with-cordova

    private b64toBlob(b64Data, contentType, sliceSize) {
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


}

