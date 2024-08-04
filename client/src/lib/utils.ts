import { generateBubbleSortAnimationArray } from "@/algorithms/bubbleSort";
import { generateSelectionSortAnimationArray } from "@/algorithms/selectionSort";
import {AnimationArrayType, SortingAlgorithmType} from "./types";

export const MIN_ANIMATION_SPEED = 100;
export const MAX_ANIMATION_SPEED = 400;

export function generateRandomNumberFromInterval(min: number, max: number){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const algorithhmOptions= [
  { label: "Bubble",  value: "bubble"},
  { label: "Quick",  value: "quick"},
  { label: "Merge",  value: "merge"},
  { label: "Insertion",  value: "insertion"},
  { label: "Selection",  value: "selection"}
];

export function generateAnimationArray(
  selectedAlgorithm: SortingAlgorithmType,
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void,
) {
  switch(selectedAlgorithm){
    case "bubble": 
      generateBubbleSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "selection":
      generateSelectionSortAnimationArray(isSorting, array, runAnimation);
      break;
    default:
      break;
  }
}