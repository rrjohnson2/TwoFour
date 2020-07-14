import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl ,image_server_url } from 'src/app/constants/app.constant';
import { Submission } from 'src/app/interfaces/submission';

@Injectable({
  providedIn: 'root'
})
export class SubmitModalService {

  constructor(private http:HttpClient) { }

  submit(submission:Submission)
  {
    return this.http.post(backendUrl+"submit",submission);
  }

  uploadSubmission(file:File)
  {
    const formData = new FormData();
    formData.append('content',file);
    return this.http.post(image_server_url +"upload",formData);
  }
}
