import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(private http: HttpClient) { }

  public getSelfData(): Observable<any> {
    return this.http.get<any>(environment.instagramApiPath + '/v1/users/self');
  }

  public getMedia(): Observable<any> {
    return this.http.get<any>(environment.instagramApiPath + '/v1/users/self/media/recent/?count=-1');
  }

  private getPage(path: string): Observable<any> {
    return this.http.get(environment.instagramPath + path,  {responseType: 'text'})
      .pipe(map(htmlString => {
        const el = document.createElement( 'html' );
        el.innerHTML = htmlString;

        const scripts = el
          .getElementsByTagName('body')[0]
          .getElementsByTagName('script');

        let script;

        for (let index = 0; index < scripts.length; index++) {
          const item = scripts.item(index);
          if (item.innerHTML.indexOf('window._sharedData') === 0) {
            script = item.innerHTML;
            break;
          }
        }

        script = JSON.parse(script.replace('window._sharedData = ', '').slice(0, -1));

        return script;
      }));
  }

  public getProfileData(): Observable<any> {
    return this.getPage(environment.instagramAccountName)
      .pipe(map(pageData => {
        return pageData.entry_data.ProfilePage[0].graphql.user;
      }));
  }

  public getPostData(postId): Observable<any> {
    return this.getPage('p/' + postId)
      .pipe(map(pageData => {
        return pageData.entry_data.PostPage[0].graphql.shortcode_media;
      }));
  }

}
