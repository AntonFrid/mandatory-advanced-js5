import { BehaviorSubject } from 'rxjs';


export const token$ = new BehaviorSubject(JSON.parse(localStorage.getItem('token')));

export function updateToken(newToken) {
  localStorage.setItem('token', JSON.stringify(newToken));
  token$.next(newToken);
};


export const starredArray$ = new BehaviorSubject(JSON.parse(localStorage.getItem('starredArray') || "[]"));

export function updateStarredArray(newStarredArray){
 localStorage.setItem('starredArray', JSON.stringify(newStarredArray));
 starredArray$.next(newStarredArray);
};

export function toggleFavorite(file) {
  let newStarredArray;

  if (starredArray$.value.find(x => x.id === file.id)) {
    newStarredArray = starredArray$.value.filter(x => x.id !== file.id);
  } else {
    newStarredArray = [...starredArray$.value, file];
  }

  localStorage.setItem('starredArray', JSON.stringify(newStarredArray));
  starredArray$.next(newStarredArray);
}

export function removeFavorite(id){
  let newStarredArray;
  newStarredArray = starredArray$.value.filter(x => x.id !== id);
  localStorage.setItem('starredArray', JSON.stringify(newStarredArray));
  starredArray$.next(newStarredArray);
}

export function clearStorage(){
  let newStarredArray = [];
  localStorage.setItem('starredArray', JSON.stringify(newStarredArray));
  starredArray$.next(newStarredArray);
}

export function updateFavorite(file) {
  const newStarredArray = [...starredArray$.value];
  const idx = newStarredArray.findIndex(x => x.id === file.id);

  if (idx >= 0) {
    newStarredArray[idx] = file;
    localStorage.setItem('starredArray', JSON.stringify(newStarredArray));
    starredArray$.next(newStarredArray);
  }
}
