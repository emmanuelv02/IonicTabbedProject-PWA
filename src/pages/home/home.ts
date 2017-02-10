import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {MoviesService} from '../../providers/movies-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MoviesService]
})
export class HomePage {
  public movies : any;
  constructor(public navCtrl: NavController, public moviesService: MoviesService) {
    this.loadMovies();
  }

  loadMovies(){
    this.moviesService.load()
        .then(data => {
          this.movies = data;
        });
  }

}
