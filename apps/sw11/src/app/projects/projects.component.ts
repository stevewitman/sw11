import { Component, OnInit } from '@angular/core';
import { Project, ProjectsService } from '@bb/core-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectsFacade } from '@bb/core-state';

@Component({
  selector: 'bb-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]> = this.projectsFacade.allProject$;
  project: Project;
  form: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    private projectsFacade: ProjectsFacade
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.projectsFacade.loadProjects();
    this.projectsFacade.mutations$.subscribe(() => this.reset());
  }

  reset() {
    this.form.reset();
    this.project = {} as Project;
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    })
  }

  select(project: Project) {
    this.projectsFacade.selectProject(project.id);
    this.form.patchValue(project);
  }

  create() {
    this.projectsFacade.createProject(this.form.value);
  }

  update() {
    this.projectsFacade.updateProject(this.form.value);
  }

  save(project: Project) {
    if (project.id) {
      this.update();
    } else {
      this.create();
    }
  }

  delete(project: Project) {
    this.projectsFacade.deleteProject(project)
  }


  private initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      title: ['', Validators.compose([
        Validators.required
      ])],
      details: ['', Validators.compose([
        Validators.required
      ])],
      importanceLevel: [0]
    })
  }

}
