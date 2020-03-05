import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import * as projectsActions from './projects.actions';
import { Project, ProjectsService } from '@bb/core-data';
import { ProjectsPartialState } from './projects.reducer';
import { ProjectsFacade } from './projects.facade';

@Injectable()
export class ProjectsEffect {
  loadProjects$ = createEffect(() =>
    this.dataPersistence.fetch(projectsActions.loadProjects, {
      run: (
        action: ReturnType<typeof projectsActions.loadProjects>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.all().pipe(
          map((projects: Project[]) => projectsActions.projectsLoaded({ projects }))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.loadProjects>, error) => {
        console.log('Effect Load Error: ', error);
      }
    })
  );

  createProject$ = createEffect(() =>
    this.dataPersistence.fetch(projectsActions.createProject, {
      run: (
        action: ReturnType<typeof projectsActions.createProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.create(action.project).pipe(
          map((project: Project) => projectsActions.createProject({ project })),
          tap(() => this.projectsFacade.loadProjects())
        );
      },
      onError: (action: ReturnType<typeof projectsActions.createProject>, error) => {
        console.log('Effect Create Error: ', error);
      }
    })
  );

  updateProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.updateProject, {
      run: (
        action: ReturnType<typeof projectsActions.updateProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.update(action.project).pipe(
          map((project: Project) => projectsActions.projectUpdated({ project }))
        )
      },
      onError: (action: ReturnType<typeof projectsActions.updateProject>, error) => {
        console.log('Effect Update Error: ', error);
      }
    })
  );

  deleteProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.deleteProject, {
      run: (
        action: ReturnType<typeof projectsActions.deleteProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.delete(action.project).pipe(
          map(() => projectsActions.projectDeleted({ project: action.project }))
        )
      },
      onError: (action: ReturnType<typeof projectsActions.deleteProject>, error) => {
        console.log('Effect Delete Error: ', error);
      }
    })
  )

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsPartialState>,
    private projectsService: ProjectsService,
    private projectsFacade: ProjectsFacade
  ) { }
}
