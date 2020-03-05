import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

import * as projectsActions from './projects.actions';
import { Project } from '@bb/core-data';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface ProjectsState extends EntityState<Project> {
  selectedProjectId?: string | number;
  isLoading: boolean;
}

export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: ProjectsState;
}

export const projectsAdapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectsState = projectsAdapter.getInitialState({
  // set initial required properties
  selectedProjectId: null,
  isLoading: false
});

const projectsReducer = createReducer(
  initialState,
  on(projectsActions.projectSelected, (state, { selectedProjectId }) =>
    Object.assign({}, state, { selectedProjectId })
  ),
  on(
    projectsActions.projectsLoaded, (state, { projects }) =>
      projectsAdapter.addAll(projects, { ...state, isLoading: false })
  ),
  on(
    projectsActions.projectCreated, (state, { project }) =>
      projectsAdapter.addOne(project, { ...state, isLoading: false })
  ),
  on(
    projectsActions.projectUpdated, (state, { project }) =>
      projectsAdapter.upsertOne(project, { ...state, isLoading: false })
  ),
  on(
    projectsActions.projectDeleted, (state, { project }) =>
      projectsAdapter.removeOne(project.id, { ...state, isLoading: false })
  ),
  on(
    projectsActions.loadProjects,
    projectsActions.createProject,
    projectsActions.updateProject,
    projectsActions.deleteProject,
    (state) => ({
      ...state,
      isLoading: true
    })
  )
);

export function reducer(state: ProjectsState | undefined, action: Action) {
  return projectsReducer(state, action);
}
