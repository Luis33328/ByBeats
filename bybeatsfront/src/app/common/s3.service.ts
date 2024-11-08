import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as AWS from 'aws-sdk';
import { credentials } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private s3: AWS.S3;

  constructor(private http: HttpClient) {
    AWS.config.update({
      accessKeyId: credentials.ACCESS_KEY_ID,
      secretAccessKey: credentials.SECRET_ACCESS_KEY,
      region: credentials.REGION
    });

    this.s3 = new AWS.S3();
  }

  uploadFile(file: File, bucketName: string, key: string): Observable<any> {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: file.type
    };

    return new Observable(observer => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
          observer.complete();
        }
      });
    });
  }

  getFileUrl(bucketName: string, key: string): string {
    return `https://${bucketName}.s3.${credentials.REGION}.amazonaws.com/${key}`;
  }
}