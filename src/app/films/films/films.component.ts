import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  constructor(private filmService: FilmsService) { 
    
  }

  ngOnInit(): void {
    this.getFilms();
    this.fillInPeople();
    this.fillInSpecies();
  }

  public getFilms(): void {
    this.filmService.getFilmsList().subscribe((res) => {
      console.log('the films response: ', res);
      this.getFilmsFromObject();
      this.getThePopularDirector();
    }, err => {
      console.log('the service failed.', err);
    });
  }

  getFilmsFromObject(): void {
    console.log('The films with name and rank is: ', this.filmService.getFilms());
  }

  getThePopularDirector() {
    console.log('The Popular Director is: ', this.filmService.getPopularDirector());
  }

  fillInPeople(): void {
    const peopleData = {
      firstname: 'kester',
      lastname: 'john',
      age: 32
    };
    this.filmService.fillPeople(peopleData)
      .subscribe(res => {
        console.log('the Filled people: ', res);
    });
  }

  fillInSpecies(): void {
    const speciesData = {
      name: 'Gold',
      classification: 'Golden'
    };
    this.filmService.fillSpecies(speciesData)
      .subscribe(res => {
        console.log('the Filled Species: ', res);
    });
  }

}
