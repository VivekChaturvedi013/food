import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';
import { SerachComponent } from "../../partials/serach/serach.component";
import { TagsComponent } from "../../partial/tags/tags.component";
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent, 
    SerachComponent, TagsComponent, NotFoundComponent,
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  foods:Food[] = [];;
  constructor(private foodService:FoodService,
    activatedRoute: ActivatedRoute
  ){ 
    let foodsObservable : Observable<Food[]>;
    console.log(activatedRoute.params.subscribe((params) => {
    console.log(params);
  }));
    activatedRoute.params.subscribe((params)=>
    {
      if(params.searchTerm) {
        foodsObservable = foodService.getAllfoodsBySearchTerm(params.searchTerm);
      } else if (params.tag) {
        foodsObservable = foodService.getAllFoodsByTag(params.tag);
      } else {
        foodsObservable = foodService.getAllFoods();

      }
      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    }
    )
  }

}
