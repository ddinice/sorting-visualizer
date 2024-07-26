import { AnimationArrayType } from "@/lib/types";

function runBubbleSort(array: number[], animations: AnimationArrayType) {
  for (let i = 0; i < array.length; i++) {
    animations.push([[i, i], false])
    if(array[i] > array[i + 1]){
      animations.push([[i, array[i]], true]);
      animations.push([[i - 1, array[i - 1]], true]);
      [array[i], array[i + 1]] = [array[i + 1], array[i]];
    } else if (array[i] > array[i - 1]){
      animations.push([[i, array[i]], true]);
      animations.push([[i - 1, array[i - 1]], true]);
    }
   
  }
}

export function generateBubbleSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animation: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animation: AnimationArrayType = [];
  const auxiliaryArray = array.slice();
  runBubbleSort(auxiliaryArray, animation);
  runAnimation(animation);
}