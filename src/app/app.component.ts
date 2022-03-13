import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public masonryOptions: NgxMasonryOptions = {
    gutter: 40,
  };
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent | undefined;

  constructor(private httpClient: HttpClient) {
    this.loadStoryDetails();
    this.loadTopStories()
    this.loadNewStories();
    this.loadBestStories();
  }
  limit:number = 16;
  topStories: any;
  storyType = "topStories";
  storyDetails:any
  newStories: any;
  bestStories: any;
  topStoriesClass : boolean = true;
  newStoriesClass : boolean = false;
  bestStoriesClass : boolean = false;
  isLoading : boolean = false;
  masonryImages: any = [];
  startcount:number = 0;
  endCount:number = 15;

  loadStoryDetails() {
    console.log(this.startcount , this.endCount)
    this.isLoading = true;
    this.httpClient
      .get(
        `https://express-stories-api.herokuapp.com/getStories/${this.startcount}/${this.endCount}/${this.storyType}`
      )
      .subscribe((reseponse) => {
        this.storyDetails = reseponse;
        this.masonryImages= this.masonryImages.concat(this.storyDetails);
        this.isLoading = false
      });
  }

  loadTopStories() {
    this.httpClient
      .get(`https://express-stories-api.herokuapp.com/getTopStories`)
      .subscribe((reseponse) => {
        this.topStories = reseponse.toString().split(',').length;
        this.limit = this.topStories
        console.log(this.topStories)
      });
  }

  loadNewStories() {
    this.httpClient
      .get(`https://express-stories-api.herokuapp.com/getNewStories`)
      .subscribe((reseponse) => {
        this.newStories = reseponse.toString().split(',').length;
        console.log(this.newStories)

      });
  }

  loadBestStories() {
    this.httpClient
      .get(`https://express-stories-api.herokuapp.com/getBestStories`)
      .subscribe((reseponse) => {
        this.bestStories = reseponse.toString().split(',').length;
      });
  }
  
  showMoreImages() {
    
    this.startcount = this.endCount;
    this.endCount +=15;
    this.loadStoryDetails();
  }

  loadUrl(url:string){
    // the url,html tag should be called from here , how ?
    window.open(url);
    }

  itemsLoaded() {
    console.log('itemsloaded');
  }

  storyTypeUpdate(type:string){
    this.storyType = type;
    if(type == "newStories"){
      this.newStoriesClass = true;
      this.bestStoriesClass = false;
      this.topStoriesClass = false;
      this.limit = this.newStories;
      console.log(this.bestStoriesClass , this.newStoriesClass,this.topStoriesClass)
    }
    if(type == "bestStories"){
      this.newStoriesClass = false;
      this.bestStoriesClass = true;
      this.topStoriesClass = false;  
      this.limit = this.bestStories;
      console.log(this.bestStoriesClass , this.newStoriesClass,this.topStoriesClass)

     }
    if(type == "topStories"){
      this.newStoriesClass = false;
      this.bestStoriesClass = false;
      this.topStoriesClass = true; 
      this.limit=this.topStories;  
      console.log(this.bestStoriesClass , this.newStoriesClass,this.topStoriesClass)
 
    }
    this.startcount = 0 ;
    this.endCount = 15;
    this.masonryImages=[];
    this.loadStoryDetails();
  }
}
