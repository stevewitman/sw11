import { createAction, props } from '@ngrx/store';
import { Project } from '@bb/core-data';

// Select Action
export const projectSelected = createAction(
  '[PROJECT] Project Selected',
  props<{ selectedProjectId: string | number }>()
);

// Load Actions
export const loadProjects = createAction(
  '[PROJECTS] Load Projects'
);

export const projectsLoaded = createAction(
  '[PROJECTS] Projects Loaded',
  props<{ projects: Project[] }>()
);

// Create Actions
export const createProject = createAction(
  '[PROJECTS] Create Project',
  props<{ project: Project }>()
);

export const projectCreated = createAction(
  '[PROJECTS] Project Created',
  props<{ project: Project }>()
)

// Update Projects
export const updateProject = createAction(
  '[PROJECTS] Update Project',
  props<{ project: Project }>()
)

export const projectUpdated = createAction(
  '[PROJECTS] Project Updated',
  props<{ project: Project }>()
);

// Delete Projects
export const deleteProject = createAction(
  '[PROJECTS] Delete Project',
  props<{ project: Project }>()
)

export const projectDeleted = createAction(
  '[PROJECTS] Project Deleted',
  props<{ project: Project }>()
)
