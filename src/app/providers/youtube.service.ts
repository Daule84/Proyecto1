import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Youtube, Video } from '../models/youtube.models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youTubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCWmyB09o8wG7FY7-ZpRMvzBR6uCyPjwCo';
  private nextPageToken = '';
  private playlistId = 'UUuaPTYj15JSkETGnEseaFFg';

  constructor( private http: HttpClient ) { }

  getVideos(){

    const url = `${ this.youTubeUrl }/playlistItems`;

    const params = new HttpParams()
                  .set('part', 'snippet')
                  .set('key', this.apiKey)
                  .set('playlistId', this.playlistId)
                  .set('maxResults', '12')
                  .set('pageToken', this.nextPageToken);
    return this.http.get<Youtube>( url, { params })
                    .pipe(
                      map( resp => {
                        this.nextPageToken = resp.nextPageToken;
                        return resp.items;
                      }),
                      map( items => items.map( video => video.snippet)
                      )
                    );
  }
}
