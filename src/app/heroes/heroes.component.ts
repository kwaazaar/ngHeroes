import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    const hero = new Hero();
    hero.name = name;

    this.heroService.addHero(hero)
      .subscribe(heroResult => this.heroes.push(heroResult));
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero)
      .subscribe(_ => this.heroes = this.heroes.filter(h => h !== hero));
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
