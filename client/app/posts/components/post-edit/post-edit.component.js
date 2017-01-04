import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import template from './post-edit.template.html';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'post-edit',
  template: template
})
export class PostEditComponent {
  constructor(postService: PostService, route: ActivatedRoute, router: Router) {
    this._postService = postService;
    this._route = route;
    this._router = router;
  }

  ngOnInit() {
    this.post = this._route.params
      .map(params => params.id)
      .mergeMap((id) => {
        return this._postService.getPost(id);
      });
  }

  onSave(post) {
    this._postService.updatePost(post).subscribe(
      () => {
        this._router.navigate(['']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
