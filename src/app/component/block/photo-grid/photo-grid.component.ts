import { Component, OnInit } from '@angular/core';
import {InstagramService} from '../../../service/api/instagram/instagram.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.less']
})
export class PhotoGridComponent implements OnInit {

  posts$: Observable<any>;

  constructor(private instagramService: InstagramService) { }

  ngOnInit() {
    this.posts$ = this.instagramService.getProfileData()
      .pipe(map(data => {
        return data.edge_owner_to_timeline_media.edges;
      }))
      .pipe(tap(data => console.log(data)));
  }

}
